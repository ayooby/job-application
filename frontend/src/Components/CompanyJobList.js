import { useState, useContext, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardFooter,
  UncontrolledCollapse,
  Spinner,
  Table,
} from "reactstrap";

import { JOB } from "../api";
import { authHeader } from "../util";
import { UserContext } from "../Context/User";

const CompanyJobList = () => {
  const { setUser, user } = useContext(UserContext);
  const [companiesJobList, setJobList] = useState([]);

  const getJobs = () => {
    fetch(JOB, {
      headers: authHeader(),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw res.json();
      })
      .then((response) => {
        setUser({ ...user, jobs: response.list });
      })
  };

  useEffect(() => {
    if (user.jobs.length && user.userCompanies) {
      const normalizedCompanies = user.userCompanies.reduce((acc, company) => {
        acc[company.uuid] = {
          ...company,
          jobs: [],
        };
        return acc;
      }, {});

      const companiesWithJob = user.jobs.reduce((acc, job) => {
        if (acc[job.company_id]) {
          acc[job.company_id].jobs.push(job);
        }
        return acc;
      }, normalizedCompanies);

      setJobList(Object.values(companiesWithJob));
    }
  });

  return (
    <>
      <Card>
        <CardHeader>Company's Job</CardHeader>
        <CardBody>
          <ListGroup>
            {companiesJobList.map((company, index) => (
              <ListGroupItem tag="a" id={`com_${index}`} key={company.uuid}>
                {company.name}
                <UncontrolledCollapse toggler={`#com_${index}`}>
                  {company.jobs.map((job) => (
                    <p key={job.uuid}>Title: {job.title}</p>
                  ))}
                </UncontrolledCollapse>
              </ListGroupItem>
            ))}
            {companiesJobList.length === 0 && <ListGroupItem>No Job!</ListGroupItem>}
          </ListGroup>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};

export default CompanyJobList;
