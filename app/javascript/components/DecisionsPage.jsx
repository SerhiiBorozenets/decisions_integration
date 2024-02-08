import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import axios from 'axios';
import Loader from "./Loader";
import isEmpty from "ramda/src/isEmpty";
import {Link} from "react-router-dom";
import {createCsrfToken, isEmptyStr, isPresent} from "./helpers/helper";
import {Button} from "react-bootstrap";

export const BtnPrimary = ({ text, hidden, onClick, disabled }) =>
  <Button onClick={onClick} style={{backgroundColor: '#6A1B9A', border: 'none'}} hidden={hidden} disabled={disabled}>
    {text}
  </Button>

const onCreateDecision = (decision, setDecisions, setLoaded, setDecision) => {
  const url = '/create_decision';
  createCsrfToken()
  setLoaded(false)
  console.log('decision', decision)
  axios.post(url, { decision })
    .then(response => {
      console.log('response', response)
      setDecisions(prev => [response.data.data.decision, ...prev])
      setDecision({})
      setLoaded(true)
    })
    .catch(error => {
      console.error('Error:', error);
      setLoaded(true)
    });
};

const Decisions = ({ decisions, pagy, currentPage, setCurrentPage }) => {
  const itemsPerPage = 5;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(pagy.count / itemsPerPage);

  const renderPaginationItems = () => {
    const maxDisplayedPages = 5;

    if (totalPages <= maxDisplayedPages) {
      return Array.from({ length: totalPages }).map((_, index) => (
        <Pagination.Item
          key={index}
          active={index + 1 === currentPage}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ));
    } else {
      const pages = [];
      const startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
      const endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

      if (startPage > 1) {
        pages.push(<Pagination.Ellipsis key="ellipsis-start" />);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Pagination.Item
            key={i - 1}
            active={i === currentPage}
            onClick={() => paginate(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (endPage < totalPages) {
        pages.push(<Pagination.Ellipsis key="ellipsis-end" />);
      }

      return pages;
    }
  };

  return (
    <div>
      {!isEmpty(decisions) && (
        <div className='mb-3'>
          <h4 className='mt-3 text-center'>Decisions</h4>
          {decisions.map((decision) => (
            <div
              className='card py-1 px-3 m-2 mx-auto'
              style={{ borderRadius: 8 }}
              key={decision?.id}
            >
              <div className='text-start truncated p-1'>
                <Link style={{ textDecoration: 'none' }}
                      to={decision?.link} target='_blank' rel='noopener noreferrer'>
                  {decision?.description}
                </Link>
              </div>
            </div>
          ))}
          <Pagination className='d-flex justify-content-center'>
            <Pagination.First onClick={() => paginate(1)} />
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
            {renderPaginationItems()}
            <Pagination.Next onClick={() => paginate(currentPage + 1)} />
            <Pagination.Last onClick={() => paginate(totalPages)} />
          </Pagination>
        </div>
      )}
    </div>
  );
};

const DecisionsPage = () => {
  const [templates, setTemplates] = useState([])
  const [users, setUsers] = useState([])
  const [decisions, setDecisions] = useState([])
  const [decision, setDecision] = useState({})
  const [org, setOrg] = useState({})
  const [pagy, setPagy] = useState(null);
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeDecision = (e) => {
    setDecision(Object.assign({}, decision, {[e.target.name]: e.target.value}))
  }

  useEffect(() => {
    const url = `/parse_decisions_data?currentPage=${currentPage}`;
    axios.get(url)
      .then(res => {
        console.log('res', res)
        setTemplates(res.data.data.templates)
        setUsers(res.data.data.users)
        setOrg(res.data.data.org)
        setDecisions(res.data.data.decisions)
        setPagy(res.data.data.pagy);
        setError(res.data.data.error)
        setLoaded(true)
      })
      .catch(error => {console.error('Error:', error);});
  }, [currentPage]);

  if(!loaded) return <Loader />
  if(isPresent(error)) return <h1>Error: {error}</h1>

  return loaded && <div className="container mt-5">
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col-md-8">
        <div>
          <h6 className='mb-2 text-start'>Current org: {org.name}</h6>
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
              <Form.Label className='fs-6 mb-0'>Select base template</Form.Label>
              <Form.Control as="select" name="template_id" onChange={onChangeDecision}>
                <option value="">Select a template</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.description}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className='mb-3 text-start'>
              <Form.Label className='fs-6 mb-0'>Select decision manager</Form.Label>
              <Form.Control
                as="select"
                name="user_id"
                onChange={onChangeDecision}
              >
                <option value="">Select a user</option>
                {users.map(user => {
                  const {id, first_name, last_name, email} = user
                  return  <option key={id} value={id}>
                    {first_name} {last_name} ({email})
                  </option>
                }
                )}
              </Form.Control>
            </Form.Group>

            <div className='mt-3 text-end'>
              <BtnPrimary text='Create Decision'
                          disabled={isEmptyStr(decision.description) || isEmptyStr(decision.template_id) || isEmptyStr(decision.user_id)}
                          onClick={() => onCreateDecision(decision, setDecisions, setLoaded, setDecision)} />
            </div>
          </Form>
        </div>
        <Decisions decisions={decisions} pagy={pagy} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  </div>
};

export default DecisionsPage;
