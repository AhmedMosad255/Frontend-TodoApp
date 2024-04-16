
const Person = {
    name : 'Ahmed Mosaad',
    address : {
        line1 : 'alexandria',
        city : 'Cairo',
        country : 'egypt'
    },
    profile : ['twitter', 'linkedin', 'instgram'],
    printProfiles: () => {
        Person.profile.map(prof => console.log(prof))
        console.log(Person.profile[1]);
    }
}


export default function LearningJavaScript(){
    return(
        <>
        <div>{Person.name}</div>
        <div>{Person.address.city}</div>
        <div>{Person.profile[0]}</div>
        <div>{Person.printProfiles()}</div>
        </>
    )
}