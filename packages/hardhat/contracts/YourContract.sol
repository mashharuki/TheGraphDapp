// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.5 <0.9.0;
pragma abicoder v2;

contract YourContract {
	struct NestedStruct {
		uint a;
		uint[] b;
		SimpleStruct[] c;
	}
	struct SimpleStruct {
		uint x;
		uint y;
	}

	// State variables
	NestedStruct public sData;
	SimpleStruct public tData;
	uint public valueData;

	// Function to update the data
	function updateData(
		NestedStruct calldata _nestedStruct,
		SimpleStruct calldata _simpleStruct,
		uint value
	) public {
		// Update state variables
		sData = _nestedStruct; // Assigns the entire struct. For dynamic arrays, you might need more complex logic.
		tData = _simpleStruct; // Assigns the entire struct.
		valueData = value;
	}

	function updateSimpleStruct(SimpleStruct calldata _simpleStruct) public {
		tData = _simpleStruct;
	}

	// Function to get the current data
	function getData()
		public
		view
		returns (NestedStruct memory, SimpleStruct memory, uint)
	{
		return (sData, tData, valueData);
	}

	// Function list all variables in S struct
	function listS()
		public
		view
		returns (uint, uint[] memory, SimpleStruct[] memory)
	{
		return (sData.a, sData.b, sData.c);
	}

	// Function list L variable in T struct
	function listT() public view returns (uint, uint) {
		return (tData.x, tData.y);
	}
}
