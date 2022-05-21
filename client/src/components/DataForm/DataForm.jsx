import './DataForm.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOULDER } from '../../utils/mutations';

const DataForm = () => {

    const [ boulderState, setBoulderState ] = useState(
        {
            state: '',
            destination: '',
            area: '',
            sub_area: '',
            boulder_name: '',
            grade: '',
            stars: '',
            coords: '',
        }
    );

    const [ createBoulder, { error } ] = useMutation(ADD_BOULDER);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoulderState({ ...boulderState, [name]: value });
    };

    const addBoulder = async (e) => {
        e.preventDefault();
        
        await createBoulder({
            variables: { ...boulderState }
        });
        
        //console.log('BoulderState:', boulderState)
        
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

    return ( 
        <section>
            <h2> Boulder Information </h2>
            <form onSubmit={addBoulder}>
                <input
                    name='state'
                    type='text'
                    placeholder='State'
                    value={ boulderState.state}
                    onChange={handleChange}/>
                <input
                    name='destination'
                    type='text'
                    placeholder='Destination'
                    value={ boulderState.destination } 
                    onChange={handleChange}/>
                <input
                    name='area'
                    type='text'
                    placeholder='Area'
                    value={ boulderState.area }
                    onChange={handleChange}
                />
                <input
                    name='sub_area'
                    type='text'
                    placeholder='Sub Area'
                    value={ boulderState.sub_area }
                    onChange={handleChange}/>
                <input
                    name='boulder_name'
                    type='text'
                    placeholder='Boulder Name'
                    value={ boulderState.boulder_name }
                    onChange={handleChange}
                    required
                />
                <input
                    name='grade'
                    type='number'
                    placeholder='Grade'
                    value={ boulderState.grade }
                    onChange={handleChange}/>
                <input
                    name='stars'
                    type='number'
                    placeholder='Number of Stars'
                    value={ boulderState.stars }
                    onChange={handleChange}
                />
                <input
                    name='coords'
                    type='text'
                    placeholder='Coordinates'
                    value={ boulderState.coords }
                    onChange={handleChange}
                />
                <input type="file" />
                <button type='submit'> Submit </button>
            </form>
        </section>
     );
};
 
export default DataForm;