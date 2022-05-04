import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        clientList:[],
        activeItem:{
          id:null, 
          name:'',
          phone:'',
          email:'',
          address:'',
        },
        editing:false,
      }
      this.fetchTasks = this.fetchTasks.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.getCookie = this.getCookie.bind(this)


      this.startEdit = this.startEdit.bind(this)
      this.deleteItem = this.deleteItem.bind(this)
  };

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

  componentWillMount(){
    this.fetchTasks()
  }

  fetchTasks(){
    console.log('Fetching...')

    fetch('http://127.0.0.1:8000/api/client-list/')
    .then(response => response.json())
    .then(data => 
      this.setState({
        clientList:data
      })
      )
  }

  handleChange(e){

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        [e.target.name]: e.target.value
        

      }
    })
  }

  handleSubmit(e){
    e.preventDefault()
    console.log('ITEM:', this.state.activeItem)

    var csrftoken = this.getCookie('csrftoken')

    var url = 'http://127.0.0.1:8000/api/client-create/'

    if(this.state.editing === true){
      url = `http://127.0.0.1:8000/api/client-update/${ this.state.activeItem.id}/`
      this.setState({
        editing:false
      })
    }



    fetch(url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
      body:JSON.stringify(this.state.activeItem)
    }).then((response)  => {
        this.fetchTasks()
        this.setState({
           activeItem:{
          id:null, 
          name:'',
          phone:'',
          email:'',
          address:'',
        }
        })
    }).catch(function(error){
      console.log('ERROR:', error)
    })

  }

  startEdit(clients){
    this.setState({
      activeItem:clients,
      editing:true,
    })
  }


  deleteItem(clients){
    var csrftoken = this.getCookie('csrftoken')

    fetch(`http://127.0.0.1:8000/api/client-delete/${clients.id}/`, {
      method:'DELETE',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
    }).then((response) =>{

      this.fetchTasks()
    })
  }



  render(){
    var clientss = this.state.clientList
    var self = this
    return(
        <div className="container">

          <div id="clients-container">
              <div  id="form-wrapper">
                 <form onSubmit={this.handleSubmit}  id="form">
                    <div className="flex-wrapper">
                        <div style={{flex: 6}}>
                            <input onChange={this.handleChange} className="form-control" id="title" value={this.state.activeItem.name} type="text" name="name" placeholder="Nombre" required/>
                            <input onChange={this.handleChange} className="form-control" id="title" value={this.state.activeItem.phone} type="text" name="phone" placeholder="Telefono" required/>
                            <input onChange={this.handleChange} className="form-control" id="title" value={this.state.activeItem.email} type="email" name="email" placeholder="Correo" required/>
                            <select onChange={this.handleChange} className="form-control" id="title"> 
                              <option disabled selected>eliga una direccion</option>

                              {
                                clientss.map(function(client){
                                  return(
                                    <option>{client.address}</option>
                                  )
                                })
                              }
                            </select>
                            <input id="submit" className="btn btn-warning" type="submit" name="Add" />

                         </div>
                      </div>
                </form>
             
              </div>

              <div  id="list-wrapper">         
                    {clientss.map(function(clients, index){
                      return(
                          <div key={index} className="clients-wrapper flex-wrapper">

                            <div style={{flex:7}}>


                                    <span>{clients.name}</span>
  
                            </div>

                            <div style={{flex:1}}>
                                <button onClick={() => self.startEdit(clients)} className="btn btn-sm btn-outline-info">Edit</button>
                            </div>

                            <div style={{flex:1}}>
                                <button onClick={() => self.deleteItem(clients)} className="btn btn-sm btn-outline-dark delete">-</button>
                            </div>

                          </div>
                        )
                    })}
              </div>
          </div>
          
        </div>
      )
  }
}



export default App;