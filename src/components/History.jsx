import { MdOutlineCancel } from "react-icons/md";

const History = ({ history, handleDeleteResult }) => {
    return (
        <ul>
            {history.map((item, index) => (
                <li key={index} style={{ cursor: 'default', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {item.title} - {item.timestamp}

                    {/* Button to delete a specific history item (LOCALLY) */}
                    <MdOutlineCancel size='1.2rem' onClick={() => handleDeleteResult(index)} style={{
                        padding: '0', border: '0',
                        display: 'inline-flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
                    }} />
                </li>
            ))}
        </ul>
    )
}

export default History