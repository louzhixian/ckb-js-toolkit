const test = require("ava");
const { validators } = require("../dist/ckb-js-toolkit.node.js");

test("correct script should pass validation", t => {
  validators.ValidateScript({
    code_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a73da",
    args: "0x1234",
    hash_type: "data"
  });
  t.pass();
});

test("correct script with empty args", t => {
  validators.ValidateScript({
    code_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a73da",
    args: "0x",
    hash_type: "type"
  });
  t.pass();
});

test("script with invalid code hash", t => {
  t.throws(() => {
    validators.ValidateScript({
      code_hash: "0xa98c57135830e1b913",
      args: "0x",
      hash_type: "type"
    });
  });
});

test("script with invalid args", t => {
  t.throws(() => {
    validators.ValidateScript({
      code_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a73da",
      args: "0xthisisnothex",
      hash_type: "type"
    });
  });
});

test("script with invalid hash type", t => {
  t.throws(() => {
    validators.ValidateScript({
      code_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a73da",
      args: "0x",
      hash_type: "code"
    });
  });
});

test("correct outpoint", t => {
  validators.ValidateOutPoint({
    tx_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a73da",
    index: "0x0"
  });
  t.pass();
});

test("correct outpoint with positive number", t => {
  validators.ValidateOutPoint({
    tx_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a73da",
    index: "0x101"
  });
  t.pass();
});

test("outpoint with zero leaded invalid number", t => {
  t.throws(() => {
    validators.ValidateOutPoint({
      tx_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a73da",
      index: "0x010"
    });
  });
});

test("outpoint with invalid hex number", t => {
  t.throws(() => {
    validators.ValidateOutPoint({
      tx_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a73da",
      index: "0xgg1"
    });
  });
});

test("correct cellinput", t => {
  validators.ValidateCellInput({
    since: "0x10",
    previous_output: {
      tx_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a73da",
      index: "0x0"
    }
  });
  t.pass();
});

test("cellinput with invalid since", t => {
  t.throws(() => {
    validators.ValidateCellInput({
      since: "0x0001",
      previous_output: {
        tx_hash: "0xa98c57135830e1b91345948df",
        index: "0x0"
      }
    });
  });
});

test("cellinput with invalid outpoint", t => {
  t.throws(() => {
    validators.ValidateCellInput({
      since: "0x0",
      previous_output: {
        tx_hash: "0xa98c57135830e1b91345948df",
        index: "0x0"
      }
    });
  });
});

test("cellinput with invalid outpoint but skip nested validation", t => {
  validators.ValidateCellInput({
    since: "0x0",
    previous_output: {
      tx_hash: "0xa98c57135830e1b91345948df",
      index: "0x0"
    }
  }, { nestedValidation: false });
  t.pass();
});

test("correct celloutput", t => {
  validators.ValidateCellOutput({
    capacity: "0x10",
    lock: {
      code_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a73da",
      args: "0x1234",
      hash_type: "data"
    }
  });
  t.pass();
});

test("correct celloutput with type", t => {
  validators.ValidateCellOutput({
    capacity: "0x10",
    lock: {
      code_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a73da",
      args: "0x1234",
      hash_type: "data"
    },
    type: {
      code_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a73da",
      args: "0x",
      hash_type: "type"
    }
  });
  t.pass();
});

test("celloutput with invalid capacity", t => {
  t.throws(() => {
    validators.ValidateCellOutput({
      capacity: "0xggg",
      lock: {
        code_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a73da",
        args: "0x1234",
        hash_type: "data"
      }
    });
  });
});

test("celloutput with invalid lock", t => {
  t.throws(() => {
    validators.ValidateCellOutput({
      capacity: "0x10",
      lock: {
        invalid: "lock"
      }
    });
  });
});

test("celloutput with invalid lock but skips validation", t => {
  validators.ValidateCellOutput({
    capacity: "0x10",
    lock: {
      invalid: "lock"
    }
  }, { nestedValidation: false });
  t.pass();
});

test("correct celldep", t => {
  validators.ValidateCellDep({
    dep_type: "code",
    out_point: {
      tx_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a73da",
      index: "0x0"
    }
  });
  t.pass();
});

test("celldep with invalid dep type", t => {
  t.throws(() => {
    validators.ValidateCellDep({
      dep_type: "data",
      out_point: {
        tx_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a73da",
        index: "0x0"
      }
    });
  });
});

test("celldep with invalid out point", t => {
  t.throws(() => {
    validators.ValidateCellDep({
      dep_type: "dep_group",
      out_point: "invalid out point"
    });
  });
});

test("celldep with invalid out point but skips validation", t => {
  validators.ValidateCellDep({
    dep_type: "dep_group",
    out_point: "invalid out point"
  }, { nestedValidation: false });
  t.pass();
});

test("correct raw transaction", t => {
  validators.ValidateRawTransaction({
    version: "0x0",
    cell_deps: [
      {
        dep_type: "code",
        out_point: {
          tx_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a7300",
          index: "0x0"
        }
      }
    ],
    header_deps: [
      "0xb39d53656421d1532dd995a0924441ca8f43052bc2b7740a0e814a488a8214d6"
    ],
    inputs: [
      {
        since: "0x10",
        previous_output: {
          tx_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a7301",
          index: "0x2"
        }
      }
    ],
    outputs: [
      {
        capacity: "0x1234",
        lock: {
          code_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a7302",
          args: "0x1234",
          hash_type: "data"
        }
      }
    ],
    outputs_data: [
      "0xabcdef"
    ]
  });
  t.pass();
});

test("invalid raw transaction", t => {
  t.throws(() => {
    validators.ValidateRawTransaction({
      version: "0x0",
      cell_deps: "invalid",
      header_deps: [
        "0xb39d53656421d1532dd995a0924441ca8f43052bc2b7740a0e814a488a8214d6"
      ],
      inputs: [
        {
          since: "0x10",
          previous_output: {
            tx_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a7301",
            index: "0x2"
          }
        }
      ],
      outputs: [
        {
          capacity: "0x1234",
          lock: {
            code_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a7302",
            args: "0x1234",
            hash_type: "data"
          }
        }
      ],
      outputs_data: [
        "0xabcdef"
      ]
    });
  });
});

test("correct transaction", t => {
  validators.ValidateTransaction({
    version: "0x0",
    cell_deps: [
      {
        dep_type: "code",
        out_point: {
          tx_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a7300",
          index: "0x0"
        }
      }
    ],
    header_deps: [
      "0xb39d53656421d1532dd995a0924441ca8f43052bc2b7740a0e814a488a8214d6"
    ],
    inputs: [
      {
        since: "0x10",
        previous_output: {
          tx_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a7301",
          index: "0x2"
        }
      }
    ],
    outputs: [
      {
        capacity: "0x1234",
        lock: {
          code_hash: "0xa98c57135830e1b91345948df6c4b8870828199a786b26f09f7dec4bc27a7302",
          args: "0x1234",
          hash_type: "data"
        }
      }
    ],
    outputs_data: [
      "0xabcdef"
    ],
    witnesses: [
      "0x1111"
    ]
  });
  t.pass();
});