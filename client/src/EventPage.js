import React, { Component } from 'react';
import axios from 'axios';


class EventPage extends Component {
    state = {
        array: []
      }
    
      componentDidMount() {
          const {id} = this.props.match.params;
          console.log(id);

        axios.get(`https://www.eventbriteapi.com/v3/events/`+id+`/?token=LADPJLNUK47KU723ERSI`)
          .then(res => {
            const events = res.data;
            this.setState({array: [events]});
            console.log(this.state.events);
          })
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
      <div class="contour">
          { this.state.array.map((event,i) =>
          <div class="container">
                <h5>{event.name.text}</h5>
                <img src={event.logo.url} alt="evenement" class="rounded float-left"></img>
                <center>
                <div class="row">
                    <img class='lieudate col-1' src='data:image/png;base64,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' alt='date'></img>
                    <h3>{event.start.local}</h3>
                </div>
                <div class="row">
                    <img class='lieudate col-1' src="data:image/png;base64,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" alt='position'></img>
                    <h3>{event.start.timezone}</h3> 
                </div>
                <button type="button" class='btn btn-dark btn-lg bouton'>Organiser une sortie</button>
                </center>
                <h5 class="marginh5">Description event</h5>
                <p class='text-right'>{event.description.text}</p>
          </div>
            )}
      </div> 
      </div>
    </div>
        </body>
    );
      
      }
    }

export default EventPage;