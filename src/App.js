import React, { useEffect } from "react";
import { useSelector,useDispatch} from "react-redux";
import { Route, Link, Redirect, Switch, useHistory, BrowserRouter as Router } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react/cjs/react.development";
import setFolderListArr from "./redux/Actions/setFolderListArr";
import setPosition from "./redux/Actions/setPosition";
import 'font-awesome/css/font-awesome.min.css';
import setForwardPath from "./redux/Actions/setForwardPath";
import folderImg from './folder-icon-1.png';
const FolderApp = ({ match }) => {

  const history=useHistory();
  const [createFlag,setcreateFlag]=useState(true);
  const [nameVal,setnameVal]=useState("");
  const [editorFlag,seteditorFlag]=useState(false);
  const [pathArr,setpathArr]=useState([])
  const dispatch = useDispatch()
  var loc = useLocation()
  const [folderList,setfolderList] = useState({})
  const folderListArr=useSelector(state=>state.folderListArrReducer).arr;
  const position = useSelector(state=>state.positionReducer).val;
  const forwardPath = useSelector(state=>state.forwardPathReducer).val;

  const depthIterator=(target)=>{
    target.forEach((value,index)=>{
      if(value.title===match.params.folderName && (pathArr.length) === value.depth){
        setfolderList(value)
      }
      else{
        depthIterator(value.subcategories)
      }
    })
  }

  useEffect(()=>{
    var arr=((loc.pathname).split("/"))
    setpathArr(arr.splice(1,arr.length))
  },[folderListArr])

  useEffect(()=>{
    depthIterator(folderListArr)
  },[pathArr])

  const handleAddFolder=()=>{
    seteditorFlag(true);
    setcreateFlag(false);
  }

  const handleBack=()=>{
    dispatch(setForwardPath(loc.pathname))
    history.goBack()
  }

  const handleNext=()=>{
    history.push(forwardPath)
  }

  const handleLinkClick=()=>{
    dispatch(setForwardPath(""))
  }

  function validateStep(){
    var returnflag=true;
    folderList.subcategories.forEach((value,index)=>{
      console.log(nameVal)
      if(value.title===nameVal || nameVal===""){
        returnflag=false;
      }
    })
    return returnflag
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(validateStep()){
      folderList.subcategories.push({ id: position, title: nameVal, subcategories: [],depth:pathArr.length+1 })
      dispatch(setFolderListArr(folderListArr))
      dispatch(setPosition(position+1))
      seteditorFlag(false)
      setcreateFlag(true)
      setnameVal("");
    }
    else{
      if(nameVal==="")
        window.alert("Folder name cannot be empty")
      else
        window.alert("Folder already exist by this name")
    }
  }

  function deleteFolder(folderArr,val,idVal){
    folderArr.forEach((value,index)=>{
      if(value.title===val && idVal === value.id){
        folderArr.splice(index,1)
        dispatch(setFolderListArr(folderListArr))
        dispatch(setPosition(position-1))
        setnameVal("")
        dispatch(setForwardPath(""))
      }
      else{
        deleteFolder(value.subcategories,val,idVal)
      }
    })
  }

  const handleDelete=(val,idVal)=>{
    deleteFolder(folderListArr,val,idVal)
  }

  const handleText=(e)=>{
    setnameVal(e.target.value)
  }
  return (
    <>
      {match.isExact &&  (
        <div style={{marginTop:"5rem",marginLeft:"20rem",marginRight:"20rem"}}>
          <div style={{marginTop:"3rem"}}>
          <button
              style={{ marginRight: "75%", fontSize:"18px" }}
              onClick={handleBack}
              disabled={pathArr.length>1 ? false : true}
            >
              
              <i className="fa fa-arrow-left"></i>
            </button>
            <button
              style={{ marginRight: "75%", fontSize:"18px" }}
              onClick={handleNext}
              disabled={forwardPath=="" || forwardPath===loc.pathname ?true:false}
            >
              
              <i className="fa fa-arrow-right"></i>
            </button> 

            {createFlag ?
            <div style={{ display: 'flex'}}>
            <button
              style={{ marginLeft: "75%",fontSize:"18px" }}
              onClick={handleAddFolder}
            >
              Add Folder
            </button>
          </div> : null}
            
            </div>
          {editorFlag ? <><textarea onChange={handleText} value={nameVal}></textarea> 
          <br />
          <button style={{fontSize:"14px"}} onClick={handleSubmit}>Create</button></>
          : null}
          <br/>
          <br/>
          <br/>
          {Object.keys(folderList).length>0 && folderList.subcategories.map(subCategoryId => {
            return (
              <div style={{display:"inline-block", padding:"5px"}}>
                <Link key={subCategoryId} to={`${match.url}/${subCategoryId.title}`} onClick={handleLinkClick}>
                <img src={folderImg} /><br/>
                  {subCategoryId.title}
                </Link><br />
                <i className="fa fa-trash fa-2x" style={{color:"red"}} onClick={()=>{handleDelete(subCategoryId.title,subCategoryId.id)}} ></i>
              </div>
            );
          })}
           </div>
      )}
      <Switch>
        <Route path={`${match.path}/:folderName`} component={FolderApp} />
      </Switch>
    </>
  );
};

export const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => (
                    <Redirect to="/Home"/>
                )}/>
        <Route path={'/:folderName'} component={FolderApp} />
      </Switch>
    </Router>
  );
};
