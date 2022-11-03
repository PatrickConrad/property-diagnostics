import { useRouter } from "next/router";
import { FunctionComponent, useContext, useState } from "react";
import { ContextConsumer } from "../../state/rootContext";

interface Props {
    newError: Error;
}

interface Error {
    type: string;
    message: string;
}

const PortalBody: FunctionComponent<Props> = ({newError}) => {
    const {state, actions} = useContext(ContextConsumer)

    const [error, setError] = useState<Error>({
        type: newError.type || 'no error',
        message: newError.message || 'no error message'
    })
    const router = useRouter();

    // useEffect(()=>{
    //     return console.log({mystate: state});
    // }, [state.test])
  return (
    <>
        <span>{error.message}</span>
    </>
  )
}

export default PortalBody