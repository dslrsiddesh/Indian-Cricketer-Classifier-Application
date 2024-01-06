function ClassesTable() {
    return (
        <div className='classes-table'>
        <table>
            <thead>
            <tr>
                <th>Class Name</th>
                <th>Probability</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Sachin Tendulkar</td>
                <td>0.99</td>
            </tr>
            <tr>
                <td>Virat Kohli</td>
                <td>0.01</td>
            </tr>
            <tr>
                <td>MS Dhoni</td>
                <td>0.00</td>
            </tr>
            </tbody>
        </table>
        </div>
    );
}

export default ClassesTable;