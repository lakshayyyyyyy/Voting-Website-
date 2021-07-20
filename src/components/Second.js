import React, { Component } from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import {
    withStyles,
    makeStyles,
} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";



const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },

    margin: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },

}));

const ValidationTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
        },
    },
})(TextField);

export default function Second  (){
    let history = useHistory();
    var id;


    function idChange(e) {
        id=e.target.value;
    }
    function next() {
        localStorage.setItem("id",id);
        var data={
            id:id,
            code:localStorage.getItem('code')
        }
        axios.post('http://localhost:4200/id', data).then(res => {
            
            if (res.data == '1') {
                alert(" You already voted , You can not vote again")
            }

            if(res.data=='0'){
                history.push('/vote')

            }

        }).catch(err => console.log(err));
        
        
    }
    const classes = useStyles();
    return (
        <div>
            <div className="container" >
                <div style={{ margin: "5%" }}>
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png" style={{width:"20%"}}></img>
                </div>
                <div>
                    <ValidationTextField
                        className={classes.margin}
                        label="Enter your Aadhaar number"
                        required
                        variant="outlined"
                        id="validation-outlined-input"
                        onChange={idChange}
                    /><br /><br />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={next}
                    >
                        Continue
                    </Button>

                </div>
            </div>
        </div>
    )
}


