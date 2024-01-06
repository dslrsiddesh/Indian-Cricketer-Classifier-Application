import PropTypes from 'prop-types';

const ResultTable = (props) => {
    return (
        <div className="styled-table">
            <table>
                <thead>
                    <tr>
                        <th>Player - {props.player}</th>
                        <th>Probability Score</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.result.map((row, index) => (
                            <tr key={index}>
                                <td>{row[1]}</td>
                                <td>{row[0]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ResultTable;