import React from 'react';
import GoogleMap from 'google-distance-matrix';
import PlacesAutocomplete, {geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './distance_matrix.css';

GoogleMap.key('AIzaSyD-SBOvPF6N1JexHYQoudjMd6i7G5Q6MDA');
GoogleMap.units('imperial');
GoogleMap.mode('driving');
 
class SimpleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            address: '', 
            dest:'', 
            distanceText:'testing the distance text',
            foundDistance: false, 

        }
        this.distanceAnalyze ='Well, that aint far';
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.onChange = (address) => this.setState({ address });
        this.changeDest = (dest) => this.setState({dest});

    }

    handleFormSubmit = (event) => {
        const component = this
        const { address, dest } = this.state
        event.preventDefault()        
        GoogleMap.matrix(address, dest, function (err, distances) {
            if (err) {
                return console.log(err);
            }

            if(!distances) {
                return console.log('no distances');
            }

            if (distances.status == 'OK') {
                if(distances.rows[0].elements[0])  {
                    var distance = distances.rows[0].elements[0].duration['text'];
 
                    if(distance.indexOf('mins') >= 0) {
                        console.log('testing something');
                        distance = distance.replace('mins', 'minutes');
                    }
                    if (distance.indexOf('hour') >= 0 || distance.indexOf('hours') >=0) {
                        this.distanceAnalyze = 'Well that is far';
                    }
                    component.setState({
                        foundDistance: true, 
                        distanceText: distance
                    });
                }
            } 
        });
    }


    render() {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
        }
        const destProps = {
            value: this.state.dest,
            onChange: this.changeDest,
        }
        if (!this.state.foundDistance) {
            return (
                <div className="container">
                <form onSubmit={this.handleFormSubmit}>
                    <div className="input-field">
                        <label> Give us your origin:</label>
                        <PlacesAutocomplete inputProps={inputProps} />
                    </div>
                    <div className="input-field">
                        <label> Give us your destination </label> 
                        <PlacesAutocomplete inputProps={destProps} />
                        <button className="submitAddress" type="submit">Gimme the distance!</button>
                    </div>
                </form>
                </div>
                )
        }
        else  {
            return (  
                <div className="container">
                    <div className="addresses ">
                        <div className="origin">
                        <label>Origin (Where are you leaving from?)</label> <br/>
                        {this.state.address}
                        </div>
                        <div className="dest">
                        <label>Destination(Where are you going?)</label><br/>
                        {this.state.dest}
                        </div>
                    </div>
                        <center><h1>{this.state.distanceText}</h1> <br/>
                        {this.distanceAnalyze}
                        </center> <br/> 
            
 
                </div>
            )
        }

    }
}

export default SimpleForm
