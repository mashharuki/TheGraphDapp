import { AbiFunction, AbiParameter } from "abitype";

/**
 * Generates a key based on function metadata
 */
const getFunctionInputKey = (functionName: string, input: AbiParameter, inputIndex: number): string => {
  const name = input?.name || `input_${inputIndex}_`;
  return functionName + "_" + name + "_" + input.internalType + "_" + input.type;
};

// This regex is used to identify array types in the form of `type[size]`
const ARRAY_TYPE_REGEX = /\[.*\]$/;

/**
 * Parses form input with array support
 */
const getParsedContractFunctionArgs = (form: Record<string, any>) => {
  const keys = Object.keys(form);
  const parsedArguments = keys.map(key => {
    try {
      const keySplitArray = key.split("_");
      const baseTypeOfArg = keySplitArray[keySplitArray.length - 1];
      let valueOfArg = form[key];

      if (ARRAY_TYPE_REGEX.test(baseTypeOfArg) || baseTypeOfArg === "tuple") {
        valueOfArg = JSON.parse(valueOfArg);
        Object.keys(valueOfArg).forEach(key => {
          try {
            // Attempt to parse each property in case it's a JSON string
            valueOfArg[key] = JSON.parse(valueOfArg[key]);
          } catch (error) {
            // If parsing fails, it means the property is not a JSON string, so leave it as is
          }
        });
      } else if (baseTypeOfArg === "bool") {
        if (["true", "1", "0x1", "0x01", "0x0001"].includes(valueOfArg)) {
          valueOfArg = 1;
        } else {
          valueOfArg = 0;
        }
      }
      return valueOfArg;
    } catch (error: any) {
      // ignore error, it will be handled when sending/reading from a function
    }
  });
  return parsedArguments;
};

const getInitialFormState = (abiFunction: AbiFunction) => {
  const initialForm: Record<string, any> = {};
  if (!abiFunction.inputs) return initialForm;
  abiFunction.inputs.forEach((input, inputIndex) => {
    const key = getFunctionInputKey(abiFunction.name, input, inputIndex);
    initialForm[key] = "";
  });
  return initialForm;
};

const getInitalTupleFormState = (abiTupleParameter: Extract<AbiParameter, { type: "tuple" | `tuple[${string}]` }>) => {
  const initialForm: Record<string, any> = {};
  if (abiTupleParameter.components.length === 0) return initialForm;

  abiTupleParameter.components.forEach((component, componentIndex) => {
    const key = getFunctionInputKey(abiTupleParameter.name || "tuple", component, componentIndex);
    initialForm[key] = "";
  });
  return initialForm;
};

const getInitalTupleArrayFormState = (
  abiTupleParameter: Extract<AbiParameter, { type: "tuple" | `tuple[${string}]` }>,
) => {
  const initialForm: Record<string, any> = {};
  if (abiTupleParameter.components.length === 0) return initialForm;
  abiTupleParameter.components.forEach((component, componentIndex) => {
    const key = getFunctionInputKey("0_" + abiTupleParameter.name || "tuple", component, componentIndex);
    initialForm[key] = "";
  });
  return initialForm;
};

export {
  getFunctionInputKey,
  getInitialFormState,
  getParsedContractFunctionArgs,
  getInitalTupleFormState,
  getInitalTupleArrayFormState,
};
