import './DataForm.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TICK } from '../../utils/mutations';
//const UsaStates = require('usa-states').UsaStates;
import { capFirstChar } from '../../utils/helpers';

import Auth from '../../utils/auth';
const DataForm = ({ user }) => {

    const [ tickState, setTickState ] = useState({
        route_name: '',
        difficulty: '',
    });
   
    const [ addTick  /* , { error } */ ] = useMutation(ADD_TICK);

    const handleChange = (e) => {
        const { name, value } = e.target;
        return setTickState({ ...tickState, [name]: value });
    };

    const createTick = async (e) => {
        e.preventDefault();
        try {
            const {data} = await addTick({
                 variables: {
                    ...tickState,
                    user: Auth.getProfile().data.username
                }
            });
            console.log('CreateTick: ', {data})
        } catch(error) {
            console.error(error);
        }
        
        //! reset form
        setTickState({
            route_name: '',
            difficulty: '',
        });
    };

    return ( 
        <section className="data-form">
            <h2> {capFirstChar(user.username)}'s Boulder Information </h2>
            <form className='boulder-form' onSubmit={createTick}>
                <input 
                    name='route_name'
                    type='text'
                    placeholder='Route Name'
                    value={tickState.route_name}
                    onChange={handleChange}
                    required
                />
                <input  
                    className='difficulty'
                    name='difficulty'
                    type='number'
                    placeholder='Difficulty'
                    value={tickState.difficulty}
                    onChange={handleChange}
                />
                <button type='submit'> Submit </button>
            </form>
        </section>
    );
};

//! move to own component to use in 'the climbers fieldguide' page
/* const DataForm = ({ user }) => {

    const usStates = new UsaStates();

    const [ boulderState, setBoulderState ] = useState({
        state: '',
        destination: '',
        area: '',
        sub_area: '',
        boulder_name: '',
        grade: '',
        stars: '',
        coords: '',
    });

    const statesAbbrArr = Object.entries(usStates.states).map(([ key, value ]) => {
        return { label: value.abbreviation , value: key }
    });
   
    const [ createBoulder, { error } ] = useMutation(ADD_BOULDER);

    const handleChange = (e) => {
        const { name, value } = e.target;
        return setBoulderState({ ...boulderState, [name]: value });
    };

    const addBoulder = async (e) => {
        e.preventDefault();

        await createBoulder({
            variables: { ...boulderState },
        });

        if (error) throw error;

        //! reset form
        setBoulderState({
            state: '',
            destination: '',
            area: '',
            sub_area: '',
            boulder_name: '',
            grade: '',
            stars: '',
            coords: '',
        });
    };

    const capFirstChar = (str) => {
        return `${str[0].toUpperCase()}${str.slice(1, str.length)}'s`
    };

    return (

        <section className='data-form'>
            <h2> { capFirstChar(user.username) } Boulder Information </h2>
            <form className='boulder-form' onSubmit={addBoulder}>
                <select 
                    className='select' 
                    name='state' 
                    value={boulderState.state} 
                    onChange={handleChange}>
                    <option value='none' > Select State </option>

                    { statesAbbrArr.map(({ label, value}) => {
                        return (
                            <option 
                                name='state' 
                                type='text' 
                                key={value} 
                                value={label} 
                                onChange={handleChange}
                            > 
                                {label}
                            </option>
                        )}
                    )}
                    
                </select>

                <input
                    name='destination'
                    type='text'
                    placeholder='Destination'
                    value={boulderState.destination}
                    onChange={handleChange}
                />
                <input
                    name='area'
                    type='text'
                    placeholder='Area'
                    value={boulderState.area}
                    onChange={handleChange}
                />
                <input
                    name='sub_area'
                    type='text'
                    placeholder='Sub Area'
                    value={boulderState.sub_area}
                    onChange={handleChange}
                />
                <input
                    name='boulder_name'
                    type='text'
                    placeholder='Boulder Name'
                    value={boulderState.boulder_name}
                    onChange={handleChange}
                    required
                />
                <input
                    name='grade'
                    type='number'
                    placeholder='Grade'
                    value={boulderState.grade}
                    onChange={handleChange}
                />
                <input
                    name='stars'
                    type='number'
                    placeholder='Number of Stars'
                    value={boulderState.stars}
                    onChange={handleChange}
                />
                <input
                    name='coords'
                    type='text'
                    placeholder='Coordinates'
                    value={boulderState.coords}
                    onChange={handleChange}
                />
                <input className='upload' type='file' />
                <button type='submit'> Submit </button>
            </form>
        </section>
        
    );
};
 */
export default DataForm;
