import isEmpty from "ramda/src/isEmpty";
import {Link} from "react-router-dom";
import React from "react";

const Decisions = ({ decisions }) => {
  console.log('decisions', decisions)
  return (
    <div>
      {!isEmpty(decisions) && (
        <div className='mb-3'>
          <h4 className='mt-3 text-center'>Decisions</h4>
          {decisions.map((decision) => (
            <div
              className='card py-1 px-3 m-2 mx-auto'
              style={{ borderRadius: 8 }}
              key={decision.id}
            >
              <div className='text-start truncated p-1'>
                <Link style={{ textDecoration: 'none' }}
                      to={decision.link} target='_blank' rel='noopener noreferrer'>
                  {decision.description}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Decisions