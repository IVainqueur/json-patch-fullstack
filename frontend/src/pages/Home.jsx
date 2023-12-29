import Editor from "@monaco-editor/react"
import { useEffect, useState } from "react"
import { validatePatch } from "../utils"
import { Button } from 'flowbite-react';
import { api } from "../utils/axios.config";

const sample_data = {
    "baz": "qux",
    "foo": "bar"
}
const sample_patch = [
    { "op": "replace", "path": "/baz", "value": "boo" },
    { "op": "add", "path": "/hello", "value": ["world"] },
    { "op": "remove", "path": "/foo" }
]


const Home = () => {
    const [data, setData] = useState(JSON.stringify(sample_data, null, 4))
    const [patch, setPatch] = useState(JSON.stringify(sample_patch, null, 4))
    const [isPatchValid, setIsPatchValid] = useState(false)
    const [isDataValid, setIsDataValid] = useState(false)
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setIsPatchValid(validatePatch(patch))
    }, [patch])

    useEffect(() => {
        try {
            JSON.parse(data)
            setIsDataValid(true)
        } catch (err) {
            setIsDataValid(false)
        }
    }, [data])

    const handlePatch = () => {
        setLoading(true)
        if(!isPatchValid || !isDataValid) {
            alert('Invalid JSON or Patch')
            setLoading(false)
            return
        }
        api.patch('/patch', { json: JSON.parse(data), patch: JSON.parse(patch) })
            .then(({ data }) => {
                if (data.success) {
                    setResponse(JSON.stringify(data.patched_output, null, 4))
                }
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.error);
                } else {
                    alert('Error: ' + error.message);
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 h-screen">
            <div className="max-w-screen-xl px-4 pt-6 mx-auto lg:px-12 w-full flex flex-col gap-4">
                <h1 className="text-xl font-bold text-black dark:text-white mb-6">
                    JSON PATCH Playground
                </h1>
                <div className="flex flex-row flex-wrap gap-4">
                    <div className="flex flex-col gap-2 grow">
                        <h1 className="font-bold text-md text-black dark:text-white">YOUR JSON &nbsp;&nbsp;
                            <span
                                className={
                                    isDataValid
                                        ? "text-green-500"
                                        : "text-red-500"
                                }
                            > {
                                    isDataValid
                                        ? "Valid"
                                        : "Invalid"

                                }</span>
                        </h1>
                        <Editor defaultLanguage="json" height={"40vh"} theme="vs-dark" className="max-w-lg" value={data} onChange={setData} />
                    </div>
                    <div className="flex flex-col gap-2 grow">
                        <h1 className="font-bold text-md text-black dark:text-white">THE PATCH &nbsp;&nbsp;
                            <span
                                className={
                                    isPatchValid
                                        ? "text-green-500"
                                        : "text-red-500"
                                }
                            > {
                                    isPatchValid
                                        ? "Valid"
                                        : "Invalid"

                                }</span>
                        </h1>
                        <Editor defaultLanguage="json" height={"40vh"} theme="vs-dark" className="max-w-lg" value={patch} onChange={setPatch} />
                    </div>

                </div>
                <Button pill className="h-fit mt-4 self-center" onClick={handlePatch} disabled={loading}>SEND PATCH REQUEST</Button>
                {
                    response && (
                        <Editor defaultLanguage="json" height={"40vh"} theme="vs-dark" className="" value={response} options={{ readOnly: true }} loading={loading} />
                    )
                }
            </div>
        </section>
    )
}

export default Home