import Card from './Card'
import sachin from './images/sachin.webp'
import dhoni from './images/dhoni.webp'
import virat from './images/virat-kohli.webp'
import dravid from './images/dravid.webp'
import kapil from './images/kapil-dev.webp'

function Cards() {

    const imageList = [
        { url: sachin, title: 'Sachin Tendulkar' },
        { url: dhoni, title: 'MS Dhoni' },
        { url: virat, title: 'Virat Kohli' },
        { url: dravid, title: 'Rahul Dravid' },
        { url: kapil, title: 'Kapil Dev' }
      ];

    return (
        <div className='cards'>
            {imageList.map((image, index) => (
                <Card key={index} image={image} />
            ))}
        </div>
    )
}

export default Cards