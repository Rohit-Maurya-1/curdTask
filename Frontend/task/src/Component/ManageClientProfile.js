import React, { useEffect, useState } from "react";
import { Container, Row, Col,Modal,Form } from "react-bootstrap";

import { GETCLIENT ,UPDATECLIENT} from "../Component/Api/ApiIntigretion";
import { useParams,useNavigate} from "react-router-dom";

function MyVerticallyCenteredModal(props){
   const navigate=useNavigate()
   const getDefault= props.getDataID
   const id= props.id
  const [values,setValues] = useState({
    name:"",
    lastName:"",
    email:"",
    mobile:"",
    project:""
   });
  const handleChange =(e)=>{
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]:value,
    });
  };
  useEffect(()=>{
     setValues({name:getDefault.name,lastName:getDefault.lastName,email:getDefault.email,mobile:getDefault.mobile,project:getDefault.project})
  },[])
  const handleUpdateUser = async(e) =>{
        e.preventDefault();
        const data = await UPDATECLIENT(values,id);
        console.log(data?.data,"ghfgfgfgf");
        if(data.data.Response){
         navigate("/")
         props.setGetDataID(data.data.Response)
         props.setModalShow(false);
    }
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal--header">
        <Modal.Title id="contained-modal-title-vcenter">Update Client Data</Modal.Title>
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
                Value={getDefault?.name}
                name="name"
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                onChange={handleChange}
                className="form-control input-control-noti"
                placeholder="lastNmae"
                Value={getDefault?.lastName}
                name="lastName"
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="email"
                onChange={handleChange}
                className="form-control input-control-noti"
                placeholder="email"
                Value={getDefault?.email}
                name="email"
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="Number"
                onChange={handleChange}
                className="form-control input-control-noti"
                placeholder="Phone Number"
                Value={getDefault?.mobile}
                name="mobile"
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                onChange={handleChange}
                className="form-control input-control-noti"
                placeholder="Phone Number"
                Value={getDefault?.project}
                name="project"
              />
            </div>
           
             <div className="form-group">
              <button
                type="button"
                onClick={handleUpdateUser}
                className="btn btnSend-notifi">
                Add
              </button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
const ManageClientProfile = () => {
  const [modalShow, setModalShow]=useState();
  const [getDataID, setGetDataID]=useState({});
  const {id}=useParams()
//====================================================//
useEffect(()=>{
  getItem()
  },[])
  const getItem = async()=>{
  const getData = await GETCLIENT();
  let getId = getData.data.Response;
  const newData = getId.find((item)=>{
    return item._id===id;
  });
    setGetDataID(newData);
};
   return (
    <>
    
      <div className="main-manage--wrapp"  style={{color:"white",backgroundColor:"black"}}>
        <Container>
          <Row className="align-items-center">
            <Col lg={12}>
              <div className="main--tablecard">
                <div className="card-header-main">
                  <h2 className="heading-items-prod">client details</h2>
                </div>
                <div className="business-card-fit">
                  <Row>
                    <Col lg={12}>
                      <div className="bus--txtcontent">
                        <div className="edit-row text-end">
                          <span>
                            <button  onClick={()=>setModalShow(true)} type="button" className="btn btn-edit">
                              Edit
                            </button>
                          </span>
                        </div>
                        <div className="listprofile--wrap">
                          <div className="flex-listitem--both">
                            <div className="rightSide--businfo">
                              <h3 className="title--list"></h3>
                              <ul className="listmore--info-bis">
                                <li className="info--art-txt">
                                  <span className="fst--listmt">name</span>
                                  <span className="scnd--listmt">
                                    {getDataID?.name}
                                  </span>
                                </li>
                                <li className="info--art-txt">
                                  <span className="fst--listmt">lastName</span>
                                  <span className="scnd--listmt">
                                    {getDataID?.lastName}
                                  </span>
                                </li>
                                <li className="info--art-txt">
                                  <span className="fst--listmt">email</span>
                                  <span className="scnd--listmt">
                                    {getDataID?.email}
                                  </span>
                                </li>
                                <li className="info--art-txt">
                                  <span className="fst--listmt">mobile</span>
                                  <span className="scnd--listmt">
                                    {getDataID?.mobile}
                                  </span>
                                </li>
                                <li className="info--art-txt">
                                  <span className="fst--listmt">project</span>
                                  <span className="scnd--listmt">
                                    {getDataID?.project}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                       </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <MyVerticallyCenteredModal
          show={modalShow}
          setGetDataID={setGetDataID}
          getDataID={getDataID}
          id={getDataID._id}
          setModalShow={setModalShow}
          
          onHide={() => setModalShow(false)}
        />
      </div>
    </>
  );
};
export default ManageClientProfile;
