import React, { Component } from 'react'
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useHistory } from "react-router-dom";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

export class Votes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            selected: '',
            check: false,
        }

    }
    componentDidMount() {
        var data={
            code:localStorage.getItem("code")
        }
        axios.post('http://localhost:4200/allusers',data).then(res => {
            console.log(res.data);
            this.setState({
                candidates: res.data
            })

        }).catch(err => console.log(err));
    }
    select = e => {
        e.preventDefault();
        this.setState({
            selected: e.target.value
        });
    }

    voteAperson = e => {
        e.preventDefault();
        const data = {
            name: this.state.selected,
            code:localStorage.getItem("code"),
            id:localStorage.getItem("id")
        }
        axios.post('http://localhost:4200/voteAperson', data).then(res => {

            if (res) {
                alert("Thanks for your vote");
                this.setState({
                    check: true
                })
            }

        }).catch(err => console.log(err));

    }


    render() {

        return (
            <div >
                <div style={{ margin: "5%" }} >
                    <img src="https://cdn.abcotvs.com/dip/images/5908680_yourvoiceyourvote-prop13.jpg?w=630&r=16%3A9" style={{ width: "30%" }}></img>
                </div>
                {
                    this.state.check === false ?
                        (
                            <div>
                                <FormControl component="fieldset"
                                // className={classes.formControl}
                                >
                                    <FormLabel component="legend">Vote a Candidate</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" onChange={this.select} >
                                        {this.state.candidates.map((item, index) => (
                                            <FormControlLabel value={item.name} control={<Radio />} label={item.name} key={index} />
                                        ))}
                                    </RadioGroup>
                                    {this.state.selected === '' ?
                                        (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled
                                            >
                                                Vote
                        </Button>
                                        ) :
                                        (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.voteAperson}
                                            >
                                                Vote
                        </Button>
                                        )
                                    }
                                </FormControl>

                            </div>
                        ) : (
                            <div>
                                <a href="/compare" style={{textDecoration:"none"}}>
                                <Button variant="contained" color="secondary"> Check polling >> </Button>
                                </a>
                            </div>

                        )
                }
            </div>
        )
    }
}

export default Votes
