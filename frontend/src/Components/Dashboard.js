import { Col } from "reactstrap";
import CompanyJobList from "./CompanyJobList";
import CompanyList from "./CompanyList";
import JobList from "./JobList";

const Dashboard = () => {
  return (
    <>
      <Col md={4} className="mt-4">
        <JobList />
      </Col>
      <Col md={4} className="mt-4">
        <CompanyList />
      </Col>
      <Col md={4} className="mt-4">
        <CompanyJobList />
      </Col>
    </>
  );
};

export default Dashboard;
