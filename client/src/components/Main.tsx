import { Card } from "./Card";

export const Main = () => {
    return (
        <main>
            <AddNote />
            <AddNote />
            <AddNote />
        </main>
    )
}

const AddNote = () => {
    return <Card onClick={() => alert("Add Note")} className="add-note">
        <span style={{
            textAlign: "center",
            margin: "auto",
            fontSize: "4rem",
            color: "black"
        }}>+</span>
    </Card>
}


