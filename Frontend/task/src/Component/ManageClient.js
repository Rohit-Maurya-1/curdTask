import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Modal, Form } from "react-bootstrap";
import { ADDCLIENT,GETCLIENT ,UPDATECLIENT,DELETECLIENT} from "../Component/Api/ApiIntigretion";
import "./ManageClient.css";
import { useNavigate} from "react-router-dom";

function MyVerticallyCenteredModal(props){
const [values, setValues] = useState({
       name:"",
       lastName:"",
       email:"",
       mobile:"",
       project:""
   });
  const handleChange = (e) =>{
    const {name,value} = e.target;
    setValues({
      ...values,
      [name]:value,
    });
  };
  const handleAddUser = async (e) =>{
    try {
      e.preventDefault();
      const data = await ADDCLIENT(values);
        if (data.data.Response) {
          props.setModalShow(false);
        let newData=[...props.addUser,data.data.Response];
         props.setAddUser(newData);
      }
    } catch (error) {
       console.log(error);
    }
    };
  return(
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal--header">
        <Modal.Title id="contained-modal-title-vcenter">Add client</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-5 pb-5 pt-0">
        <div className="notifi--wraper-body">
          <Form>
            <div className="form-group mb-4">
              <input
                type="text"
                onChange={handleChange}
                className="form-control input-control-noti"
                placeholder="Name"
                name="name"
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                onChange={handleChange}
                className="form-control input-control-noti"
                placeholder="last Name"
                name="lastName"
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="email"
                onChange={handleChange}
                className="form-control input-control-noti"
                placeholder="Email Address"
                name="email"
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="Number"
                onChange={handleChange}
                className="form-control input-control-noti"
                placeholder="Phone Number"
                name="mobile"
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                onChange={handleChange}
                className="form-control input-control-noti"
                placeholder="Project"
                name="project"
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                onClick={handleAddUser}
                className="btn btnSend-notifi"
              >
                Add
              </button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
const ManageClient = () => {

  const [modalShow,setModalShow] = useState(false);
  const [addUser,setAddUser] = useState([]);
  const navigate = useNavigate();
   
useEffect(()=>{
    getItem();
  },[]);
       const getItem =async ()=>{
       const getData = await GETCLIENT();
        setAddUser(getData.data.Response);
      };
//========================deleteData=================================//
   const handleDeleteData= async(id)=>{
               await DELETECLIENT(id) 
               const deleteData= addUser.filter((item)=>{
               return item._id!==id
       })
         setAddUser(deleteData)
        }
  
 //=========================================pagination===========================
return (
    <>
      <div className="main-manage--wrapp">
        <Container>
          <Row className="align-items-center">
            <Col lg={12}>
              <div className="main--tablecard">
                <div className="card-header-main">
                  <h3 className="heading-items-prod">Manage Client</h3>
                 
                 
                </div>
               
                <div className="table-wraper-body">
                <div className="adduser--tab">
                    <button width="100px"height="100px"
                      variant="primary"
                      onClick={() => setModalShow(true)}
                      className="btn btn-add"
                    >
                      Add User
                    </button>
                  </div>
                  <Table
                    bordered
                    className="table-body-content"
                    responsive="sm"
                  >
                    <thead>
                      <tr>
                      
                        <th className="t-head">Name</th>
                        <th className="t-head">lastName</th>
                        <th className="t-head">email</th>
                        <th className="t-head">mobile</th>
                        <th className="t-head">project</th>
                      </tr>
                    </thead>
                    <thead>
                      {/* //===================================== */}
                      {addUser.map((value,i) => {
                        return (
                          <tr bordered>
                            <td className="t-head">{value?.name}</td>
                            <td className="t-head">{value?.lastName}</td>
                            <td className="t-head">{value?.email}</td>
                            <td className="t-head">{value?.mobile}</td>
                            <td className="t-head">{value?.project}</td>
                              <td>
                              <button
                                className="btn eye-btn"
                                onClick={()=>navigate(`/ManageUserProfile/${value?._id}`)}
                              >
                              view
                              </button>
                            </td>
                            <button
                                className="btn eye-btn"
                                onClick={()=>handleDeleteData(value?._id)}
                               > delete
                              </button>
                           </tr>
                        );
                      })}
                    {/*=======================================================*/}
                    </thead>
                 </Table>
                </div>
              </div>
            </Col>
        
          </Row>
        
        </Container>
        {/*==================================== call function==================== */}
        <MyVerticallyCenteredModal
          show={modalShow}
          addUser={addUser}
          // getItem={getItem()}
          setAddUser={setAddUser}
          setModalShow={setModalShow}
          onHide={() => setModalShow(false)}
        />
        </div>
     
    </>

  );
};

export default ManageClient;
