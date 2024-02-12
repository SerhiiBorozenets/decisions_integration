import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import axios from 'axios';
import Loader from "./Loader";
import {createCsrfToken, isEmptyStr, isPresent} from "./helpers/helper";
import {Button} from "react-bootstrap";
import Decisions from "./Decisions";
import {Typeahead} from "react-bootstrap-typeahead";

export const BtnPrimary = ({ text, hidden, onClick, disabled }) =>
  <Button onClick={onClick} style={{backgroundColor: '#6A1B9A', border: 'none'}} hidden={hidden} disabled={disabled}>
    {text}
  </Button>

const onCreateDecision = (decision, setDecisions, setLoaded, setDecision,
                          setError, setSelectedTemplate, setSelectedUser) => {
  const url = '/create_decision';
  createCsrfToken()
  setLoaded(false)

  axios.post(url, { decision })
    .then(response => {
      console.log('response', response)
      setDecisions(prev => [response.data.data.decision, ...prev])
      setError(response.data.data.error)
      setDecision({})
      setSelectedUser([])
      setSelectedTemplate([])
      setLoaded(true)
    })
    .catch(error => {
      console.error('Error:', error);
      setError(error)
      setSelectedUser([])
      setSelectedTemplate([])
      setLoaded(true)
    });
};

const DecisionsPage = () => {
  const [templates, setTemplates] = useState([])
  const [users, setUsers] = useState([])
  const [decisions, setDecisions] = useState([])
  const [decision, setDecision] = useState({})
  const [org, setOrg] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState([]);
  const [selectedManager, setSelectedManager] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);

  const onChangeDecision = (e) => {
    setDecision(Object.assign({}, decision, {[e.target.name]: e.target.value}))
  }

  useEffect(() => {
    setDecision(Object.assign({}, decision, {
      template_slug: selectedTemplate[0]?.slug,
      user_email: selectedManager[0]?.email,
      collaborators: selectedCollaborators
    }))
  }, [selectedTemplate, selectedManager, selectedCollaborators])

  useEffect(() => {
    const url = `/init_data`;
    axios.get(url)
      .then(res => {
        console.log('res', res)
        setTemplates(res.data.data.templates)
        setUsers(res.data.data.users)
        setOrg(res.data.data.org)
        setError(res.data.data.error)
        setLoaded(true)
      })
      .catch(error => {console.error('Error:', error);});
  }, []);

  if(!loaded) return <Loader />
  if(isPresent(error)) return <h1>Error: {error}</h1>

  return loaded && <div className="container mt-5">
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col-md-8">
        <div>
          <h6 className='mb-2 text-start'>Current org: {org?.name}</h6>
          <Form id="regForm">
            <h1 className='red-violet'>Cloverpop Decisions Api</h1>
            <Form.Group className='mb-2 text-start'>
              <Form.Label className='fs-6 mb-0'>Decision description</Form.Label>
              <Form.Control
                type="text" maxLength={100}
                placeholder="Add description"
                name="description"
                value = {decision.description || ''}
                onChange={onChangeDecision}
              />
            </Form.Group>

            <Form.Group className='mb-2 text-start'>
              <Form.Label className='fs-6 mb-0'>Base template</Form.Label>
              <Typeahead
                id="typeahead-template"
                labelKey={option => option?.description}
                onChange={setSelectedTemplate}
                options={templates || []}
                placeholder="Select a template..."
                selected={selectedTemplate}
              />
            </Form.Group>

            <Form.Group className='mb-3 text-start'>
              <Form.Label className='fs-6 mb-0'>Decision manager</Form.Label>
              <Typeahead
                id="typeahead-users"
                labelKey={option => `${option?.first_name} ${option?.last_name}`}
                onChange={setSelectedManager}
                options={users || []}
                placeholder="Select a user..."
                selected={selectedManager}
              />
            </Form.Group>

            <Form.Group className='mb-3 text-start'>
              <Form.Label className='fs-6 mb-0'>Decisions' collaborators</Form.Label>
              <Typeahead
                id="typeahead-collaborators"
                multiple
                labelKey={option => `${option?.first_name} ${option?.last_name}`}
                onChange={setSelectedCollaborators}
                options={users || []}
                placeholder="Select a user..."
                selected={selectedCollaborators}
              />
            </Form.Group>

            <div className='mt-3 text-end'>
              <BtnPrimary text='Create Decision'
                          disabled={isEmptyStr(decision.description) || isEmptyStr(decision.template_slug) || isEmptyStr(decision.user_email)}
                          onClick={() => onCreateDecision(
                            decision, setDecisions, setLoaded, setDecision, setError,
                            setSelectedTemplate, setSelectedManager
                          )} />
            </div>
          </Form>
        </div>
        <Decisions decisions={decisions} />
      </div>
    </div>
  </div>
};

export default DecisionsPage;
