import { useState, useContext, useEffect } from "react";
import {
  Modal,
  Button,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardFooter,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";

import { JOB } from "../api";
import { authHeader } from "../util";
import { UserContext } from "../Context/User";

const JobList = () => {
  const { setUser, user } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("loading");
  const toggleModal = () => setModal(!modal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, company_id } = e.target;
    const result = await fetch(JOB, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify({
        title: title.value,
        company_id: company_id.value,
      }),
    }).then(async (res) => ({
      error: !res.ok,
      data: await res.json(),
    }));

    if (result.error) {
      setError(result.data);
      return;
    }
    setUser({
      ...user,
      jobs: [...user.jobs, result.data.job],
    });
    toggleModal();
  };
  const updateUser = async (list) => {
    setUser((state) => {
      state.jobs = list;
      return state
    });
  };

  const getJobs = () => {
    fetch(JOB, {
      headers: authHeader(),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw res.json();
      })
      .then((response) => {
        updateUser(response.list);
      })
      .catch(() => setStatus("error"));
    setStatus("loaded");
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <>
      <Card>
        <CardHeader>My Jobs</CardHeader>
        <CardBody>
          {status === "loading" && <Spinner />}
          {status === "loaded" && (
            <ListGroup>
              {user.jobs.map((job) => (
                <ListGroupItem key={job.uuid}>{job.title}</ListGroupItem>
              ))}
              {user.jobs.length === 0 && <ListGroupItem>No Job!</ListGroupItem>}
            </ListGroup>
          )}
        </CardBody>
        <CardFooter>
          <Button color="link" onClick={toggleModal}>
            New Job
          </Button>
        </CardFooter>
      </Card>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                required
                type="text"
                name="title"
                id="title"
                placeholder="Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="company">Company</Label>
              <Input required type="select" name="company_id" id="company">
                <option value="">Select Company</option>
                {user.companyList.map((company) => (
                  <option value={company.uuid} key={company.uuid}>
                    {company.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            {error && <p className="text-danger">{error.msg}</p>}
            <Button>Offer</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default JobList;
