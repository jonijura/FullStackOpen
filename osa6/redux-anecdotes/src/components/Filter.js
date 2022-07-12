import { connect } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = (props) => {
    const style = {
        marginBottom: 10
    }
    return (
        <div style={style}>
            <input name='filter' onChange={(e) => props.setFilter(e.target.value)} />
        </div>
    )
}

export default connect(null,{setFilter})(Filter)