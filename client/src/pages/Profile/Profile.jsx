import './Profile.css';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const Profile = ({ DataForm, Chart, TickList }) => {
  const { _id: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { _id: userParam },
  });

  //* pass as prop to DataFrom component
  const user = data?.me || data?.user || {};

  console.log('Profile data: ', data);

  if (Auth.loggedIn() && Auth.getProfile().data._id === userParam)
    return <Navigate to='me' />;

  if (loading) {
    return <div> Loading... </div>;
  }

  if (!user?._id) {
    return (
      <div className='err-message'>
        <h2>
          You need to be logged in to see this. Please sign in to continue.
        </h2>
        <Link to={'/'}> Sign in </Link>
      </div>
    );
  }

  //! move to own component later
  const tickArr = [];
  let tickObj = {};

  //* add all users ticks to tickArr
  user.ticks.forEach((tick, i) => tickArr.push(tick.difficulty));

  //* create difficulty: # climbed object
  //* if key does not exist add key and assign value to 1
  //* if key already exists increase existing value by 1
  for (let tick of tickArr) {
    tickObj[tick] ? tickObj[tick]++ : (tickObj[tick] = 1);
  }

  //* build data prop and pass to Chart component
  const chartData = [];

  //* add difficulty in descending order HIGH -> LOW
  for (let tick in tickObj) {
    chartData.unshift([`v${tick}`, tickObj[tick], 'rgb(123, 104, 238)', null]);
  }

  //* add to first position of chartData array
  chartData.unshift([
    'Element',
    'You Climbed',
    { role: 'style' },
    {
      sourceColumn: 0,
      role: 'annotation',
      type: 'string',
      calc: 'stringify',
    },
  ]);

  //* pass options to Chart component
  const options = {
    title: 'Boulders Climbed By Grade',
    hAxis: {
      title: '# of Routes Climbed',
    },
    vAxis: {
      title: 'Grade',
    },
    width: '100%',
    height: '100%',
    bar: { groupWidth: '80%' },
    legend: { position: 'none' },
  };

  return !user.ticks.length ? (
    <main className='profile-container'>
      <section className='tick-list-container'>
        <DataForm className='data-form' user={user} />
        <h3> No Ticks Yet</h3>
      </section>
    </main>
  ) : (
    <main className='profile-container'>
      <DataForm className='data-form' user={user} />

      <div className='chart'>
        <Chart
          chartType='BarChart'
          data={chartData}
          options={options}
          user={user}
        />
      </div>

      <TickList user={user} />
    </main>
  );
};

export default Profile;
