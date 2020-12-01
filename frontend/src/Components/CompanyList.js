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

import { COMPANY } from "../api";
import { authHeader } from "../util";
import { UserContext } from "../Context/User";

const CompanyList = () => {
  const { setUser, user } = useContext(UserContext);
  const [status, setStatus] = useState("loading");
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const toggleModal = () => setModal(!modal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, is_enabled } = e.target;
    const result = await fetch(COMPANY, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify({
        name: name.value,
        is_enabled: is_enabled.value,
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
      companyList: [...user.companyList, result.data.company],
      userCompanies: [...user.userCompanies, result.data.company],
    });
    toggleModal();
  };

  const getAllCompanies = () => {
    fetch(`${COMPANY}all`, {
      headers: authHeader(),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw res.json();
      })
      .then((response) => {
        setUser({
          ...user,
          companyList: response.list,
          userCompanies: response.list.filter(
            (company) => company.user_id === user.user.id
          ),
        });
        setStatus("loaded");
      });
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  return (
    <>
      <Card>
        <CardHeader>Company</CardHeader>
        <CardBody>
          {status === "loading" && <Spinner />}
          {status === "loaded" && (
            <ListGroup>
              {user.userCompanies.map((company) => (
                <ListGroupItem key={company.uuid}>{company.name}</ListGroupItem>
              ))}
              {user.userCompanies.length === 0 && (
                <ListGroupItem>No Company!</ListGroupItem>
              )}
            </ListGroup>
          )}
        </CardBody>
        <CardFooter>
          <Button color="link" onClick={toggleModal}>
            New Company
          </Button>
        </CardFooter>
      </Card>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                required
                type="text"
                name="name"
                id="name"
                placeholder="Name"
              />
            </FormGroup>
            <FormGroup check>
              <Label for="is_enabled">
                <Input
                  defaultChecked={true}
                  required
                  type="checkbox"
                  name="is_enabled"
                  id="is_enabled"
                />
                Enabled
              </Label>
            </FormGroup>
            {error && <p className="text-danger">{error.msg}</p>}
            <Button>Register</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CompanyList;
