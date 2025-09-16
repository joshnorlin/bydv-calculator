import { useDispatch } from "react-redux"
import { setLocation } from "../../store/userDecisionSlice";

function Location() {
    const dispatch = useDispatch();

    return (
        <div>
            <span>Location placeholder!</span>
            <button onClick={() => (dispatch(setLocation('warsaw')))}>click me</button>
        </div>
    )
}

export default Location;