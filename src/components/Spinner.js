import loading from './loarding.gif'

const Spinner = (props) => {
    return (
        <>
            <div className='text-center'>
                <img className='my-5' src={loading} alt='Loading'></img>
            </div>
        </>
    )
}

export default Spinner;