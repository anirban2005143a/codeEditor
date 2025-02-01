const executeCode = async (code, input, language) => {

    console.log(code)
    console.log(input)
    console.log(language)
    console.log(JSON.stringify({
        "clientId": `${import.meta.env.VITE_REACT_JDOODLE_CLIENT_ID}`,
        "clientSecret": `${import.meta.env.VITE_REACT_JDOODLE_CLIENT_SECRET}`,
        "script": code,
        "stdin": input,
        "language": language,
        "versionIndex": "3",
        "compileOnly": false
    }))
    // const res = await fetch("https://api.jdoodle.com/v1/execute", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         "clientId": "ebd7b9022f2f8bc12b97eaed92861aba",
    //         "clientSecret": "b91e8e3e2020a061aa8ffe8ecf09b769d338399e5f9cc249b15a8ae88318e96d",
    //         "script": `${code}`,
    //         "stdin": `${input}`,
    //         "language": `${language}`,
    //         "versionIndex": "3",
    //         "compileOnly": false
    //     })
    // })
    console.log(res);
    const data = await res.json();
    console.log(data)
}

export default executeCode