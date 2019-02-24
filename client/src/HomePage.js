import React, { Component } from 'react';
import axios from 'axios';
import './HomePage.css';

class HomePage extends Component {
  state = {
    array: [],
    categories: [],
    id_categorie : '',
    lieu : '',
    longitude : '2.3527',
    latitude : '48.8543'
  }

  componentDidMount() {
  this.getMyLocation();
  
    axios.get(`https://www.eventbriteapi.com/v3/events/search/?location.within=500km&location.latitude=${this.state.latitude}&location.longitude=${this.state.longitude}&token=LADPJLNUK47KU723ERSI`)
      .then(res => {
        const events = res.data.events;
        for (let index = 0; index < events.length; index++) {
          this.setState({ array: [...this.state.array,events[index]]});
          console.log(`https://www.eventbriteapi.com/v3/events/search/?location.within=500km&location.latitude=${this.state.latitude}&location.longitude=${this.state.longitude}&token=LADPJLNUK47KU723ERSI`);
          }

      })
      axios.get(`https://www.eventbriteapi.com/v3/categories/?token=LADPJLNUK47KU723ERSI `)
      .then(res => {
        const categories = res.data.categories;
        for (let index = 0; index < categories.length; index++) {
          this.setState({ categories: [...this.state.categories,categories[index]]});
          }

      })
  }
    categorie = (e) => {
      const value = e.target.value;
      this.setState({id_categorie : value});
      console.log(this.state.id_categorie);
    }

    endroit = (e) => {
      const value = e.target.value;
      this.setState({lieu : value});
      console.log(this.state.lieu);
    }

    filtrer = () => {
      var id_categorie = `https://www.eventbriteapi.com/v3/events/search/?categories=${this.state.id_categorie}&token=LADPJLNUK47KU723ERSI`
      var lieu = `https://www.eventbriteapi.com/v3/events/search/?location.address=${this.state.lieu}&token=LADPJLNUK47KU723ERSI`
      var lieu_id_categorie = `https://www.eventbriteapi.com/v3/events/search/?location.address=${this.state.lieu}&categories=${this.state.id_categorie}&token=LADPJLNUK47KU723ERSI`
     
      if(this.state.id_categorie === null && this.state.lieu === null){
        axios.get(`https://www.eventbriteapi.com/v3/events/search/?location.within=km&location.latitude=${this.state.latitude}&location.longitude=${this.state.longitude}&token=LADPJLNUK47KU723ERSI`)
        .then(res => {
        const evenement = res.data.events;
        this.setState({ array: evenement});
        console.log(this.state.array);
      })  
      }

      if(this.state.id_categorie !== null && this.state.lieu === null){
        axios.get(id_categorie)
        .then(res => {
        const evenement = res.data.events;
        this.setState({ array: evenement});
        console.log(this.state.array.id);
      })        
      }

      if(this.state.lieu !== null && this.state.id_categorie === null){
        axios.get(lieu)
        .then(res => {
        const evenement = res.data.events;
        this.setState({ array: evenement});
        console.log(this.state.array.start.timezone);
      })              
      }

      if(this.state.lieu !== null && this.state.id_categorie !== null){
        axios.get(lieu_id_categorie)
        .then(res => {
        const evenement = res.data.events;
        this.setState({ array: evenement});
        console.log(this.state.array);
      })  
      }
      console.log(this.state.id_categorie);
    }

    getMyLocation = () => {
      const location = window.navigator && window.navigator.geolocation
      
      if (location){
        location.getCurrentPosition(function (position) {
           let  latitude = position.coords.latitude;
           let longitude = position.coords.longitude;
            console.log("latitude : " + latitude);
            console.log("longitude : " + longitude);
            this.setState({
               latitude: latitude, 
               longitude: longitude
            });
        }.bind(this));
    }
  
    }

  render() {
    return (
      <body class="container-fluid">
        <header>
        <a href="/home" class="titre"><h2 class='float-left'>My_events</h2></a>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzJy3Ue46Nh91gu0LGLgmHx0ey4R1avXmRJe18CEH9lOWxCEj4Vw" alt="connexion" class="float-right connexion"></img>
      </header>
      <div class='container-fluid'>
<div class="row">
  <div class='menu col-3 contour'>  
    <div class='float-left'>
      <h2 class="margin">Filtres</h2>
      <select id="select" onChange={this.categorie.bind(this)}>
        <option value="">--Aucun--</option>
      {this.state.categories.map((categorie) =>
        <option value={categorie.id} >{categorie.name}</option>
      )}
        
      </select>
      <input type="text" placeholder="Lieu" class="margin" onChange={this.endroit.bind(this)}></input>
      <br></br>
      <button type="submit" class='btn btn-dark' onClick={this.filtrer.bind(this)}>Filtrer</button>
    </div>
  </div>
    <div class="col-1"></div>
  <div class="contour col-8">
    <h3 class="padding">Events à venir</h3>
      { this.state.array.map((event,i) =>{
          const img = event.logo === null ? "" : event.logo.original.url;
          const description = event.description.text === null ? "NO DESCRIPTION" : event.description.text;
          const titre = event.name.text === null ? 'NO TITLE' : event.name.text;
            return (
            <div class="container contour2">
            <div class="row">
              <img src={img} alt='event' class='float-left image col-5'></img>
              <h3 class='col-7'>{titre}</h3>
            </div>
            <div class='row'>
              <p class='text-right description'>{description}</p>
            </div>
            <div class='row'>
              <a href={'/Event/'+ event.id}><button type="button" class='shadow btn btn-dark col' >En savoir +</button></a>
            </div>
  
        </div>
          )}
        )}
  </div> 
  </div>
</div>
    </body>
);
}
}

export default HomePage;