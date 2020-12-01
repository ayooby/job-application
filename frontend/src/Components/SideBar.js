import { ListGroup, ListGroupItem } from "reactstrap";

const SideBar = () => {
  return (
    <div id="sidebar-wrapper">
      <div className="sidebar-heading">Wiredata</div>
      <ListGroup>
        <ListGroupItem tag="a" href="/dashboard">
          Dashboard
        </ListGroupItem>
        <ListGroupItem tag="a" href="/register">
          Register
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default SideBar;
