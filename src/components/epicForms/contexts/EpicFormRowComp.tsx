'use client'

import useEpicFormData from "@/components/epicForms/contexts/EpicFormContext";
import { EpicFormRowContext } from "@/components/epicForms/contexts/EpicFormRowContext"
import { ReactNode, useCallback, useEffect, useState } from "react"

type EpicFormRowCompPropType = {
    displayName: string,
    paramName: string,
    children?: ReactNode,
    error?: string|null,
}

const useFormRowError = (paramName: string, initError: string|null) => {
    const [error, setError] = useState<null|string>(null);

    const {epicFormDataDispatch} = useEpicFormData();

    const _setError = useCallback((value: string|null) => {
        epicFormDataDispatch(value === null ? { type: 'removeError', param: paramName } : { type: 'editError', error: value, param: paramName })
        setError(value);
    }, [epicFormDataDispatch, paramName])

    useEffect(() => {
        const oldParamName = paramName;
        
        _setError(initError);

        return () => {
            epicFormDataDispatch({ type: 'removeError', param: oldParamName })
        }
    }, [_setError, epicFormDataDispatch, initError, paramName])

    return { setError: _setError, error }
}

const EpicFormRowComp = (props: EpicFormRowCompPropType) => {
    const {error, setError} = useFormRowError(props.paramName, props.error??null);

    return  (
        <EpicFormRowContext.Provider value={{epicRowData: { displayName: props.displayName, error: error, paramName: props.paramName }, setFormError: setError}}>
            {props.children}
        </EpicFormRowContext.Provider>
    )
}

export default EpicFormRowComp;
