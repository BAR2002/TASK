import { useEffect ,useState } from 'react';
import './App.css';
import Modal from './Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



function App() {
const [data, setData] = useState([]);
const  [eachSelectionOfCategory , setEachSelectionOfCategory] =useState({});

  useEffect(() => {
    let getdata = async ()=>{
          let gotdata = await fetch('http://localhost:8080/api/getBallotData',{
            method: "GET",
            headers: {
              "access-control-allow-origin" : "*",
              "Content-type": "application/json; charset=UTF-8"
            }}).then(e=>e.json()).then(e=> {
              setData(e.items);
              setEachSelectionOfCategory(e.items.reduce((acc,curr)=>{
                acc = {...acc , [curr.title]: ""};
                return acc
              },{}));
            })
    }
    getdata();
  }, []);

  function categoryWiseUserSelected(value,category){
    let copyOfSelectionCategoryData = JSON.parse(JSON.stringify(eachSelectionOfCategory)) ;
    copyOfSelectionCategoryData[category] = ""
      data.forEach(e => {
          e.items.forEach(item => {
            copyOfSelectionCategoryData[e.title] = value.title == item.title ? item.title : copyOfSelectionCategoryData[e.title]
            item.selected = copyOfSelectionCategoryData[e.title] == item.title ? true : false
          });
      });
      let copy = JSON.parse(JSON.stringify(data));
      setEachSelectionOfCategory(JSON.parse(JSON.stringify(copyOfSelectionCategoryData)));
      setData(copy);
  }

 
  


  return (
    <div className="App">
      {(data || []).map((e,ei)=>{
        return (
          <div className="categories">
            <h4 className='title'>{e.title}</h4>
            <div className="listedItems">{e.items.map((f,fi)=>{
              return (
                <div className='eachItem' onClick={()=>{categoryWiseUserSelected(f,e.title)}} style={{backgroundColor : f.selected == true ? "#009B86 " : "",marginLeft: "10px"}}>
                  <Card.Title>{f.title.slice(0,15)}</Card.Title>
                  <Card style={{ width: '18rem',backgroundColor : f.selected == true ? "#009B86 " : "#34AC9C",marginTop:"30px" }}>
      <Card.Img className="images" variant="top" src={f.photoUrL} />
      <Card.Body>
        <Button variant="primary">Select</Button>
      </Card.Body>
    </Card>
                </div>
              )
            })}</div>

          </div>
        )
      })}
      <Modal/>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style={{marginLeft: "700px"}}>
        SUBMIT
</button>
    </div>
  );
}

export default App;
