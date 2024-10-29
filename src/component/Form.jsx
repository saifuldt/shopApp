import { useState, useEffect } from "react";

const Form = ({ handleAddData, shop }) => {
  const [allData, setAllData] = useState([
    {
      id: crypto.randomUUID(),
      txn: "",
      mainBalance: "",
      bakiTxn: "",
      bakiBalance: "",
      balance: 0  // Starting balance
    }
  ]);
  const [totalBalance, setTotalBalance] = useState(0); // Running total balance
  const [errors, setErrors] = useState({});
  const [sell, setSell] = useState(true);

  useEffect(() => {
    // Calculate the cumulative balance from the shop data when the component mounts
    const initialBalance = shop.reduce(
      (acc, data) => acc + (Number(data.mainBalance || 0)) - (Number(data.bakiBalance || 0)),
      0
    );
    setTotalBalance(initialBalance);
  }, [shop]);

  const formValidator = () => {
    const newErrors = {};
    if (sell) {
      if (!allData[0].txn.trim()) newErrors.txn = "Name is required";
      if (!allData[0].mainBalance) newErrors.mainBalance = "Amount is required";
    } else {
      if (!allData[0].bakiTxn.trim()) newErrors.bakiTxn = "Name is required";
      if (!allData[0].bakiBalance) newErrors.bakiBalance = "Amount is required";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllData((prevData) => [
      {
        ...prevData[0],
        [name]: value
      }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = formValidator();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const transactionAmount = sell ? Number(allData[0].mainBalance) : -Number(allData[0].bakiBalance);
      const newBalance = totalBalance + transactionAmount;

      const newTransaction = {
        ...allData[0],
        id: crypto.randomUUID(),
        balance: newBalance
      };

      setAllData([...allData, newTransaction]);
      handleAddData(newTransaction);
      setTotalBalance(newBalance); // Update the running total balance

      // Reset form with updated balance
      setAllData([
        {
          id: crypto.randomUUID(),
          txn: "",
          mainBalance: "",
          bakiTxn: "",
          bakiBalance: "",
          balance: newBalance
        }
      ]);
      setErrors({});
    }
  };

  const toggleBtn = () => {
    setSell((prevSell) => !prevSell);
  };

  return (
    <div className="text-center pt-10">
      <h1 className="text-xl font-semibold mb-6">Juwel Telecom</h1>
      <button
        className={`mt-2 w-20 h-10 rounded-lg cursor-pointer ${sell ? "bg-green-500" : "bg-red-500"}`}
        onClick={toggleBtn}
      >
        {sell ? <span> Sell</span> : <span>Baki</span>}
      </button>
      <span className="font-bold mt-2 px-2 py-2 rounded-lg border-2 border-green-500">
        Balance: {totalBalance}
      </span>

      <form className="mt-6" onSubmit={handleSubmit}>
        {sell ? (
          <div className="main">
            <label htmlFor="txn">Txn</label>
            <input
              className="w-64 h-10 border pl-2 border-gray-300"
              type="text"
              placeholder="Details"
              name="txn"
              id="txn"
              value={allData[0].txn}
              onChange={handleChange}
            />
            <input
              className="w-20 h-10 pl-1 border border-gray-300"
              type="number"
              name="mainBalance"
              id="mainBalance"
              value={allData[0].mainBalance}
              placeholder="Tk."
              onChange={handleChange}
            />
            <div className="flex gap-2 justify-center items-center">
              {errors.txn && <p className="text-red-500">{errors.txn}</p>}
              {errors.mainBalance && <p className="text-red-500">{errors.mainBalance}</p>}
            </div>
          </div>
        ) : (
          <div className="baki">
            <label htmlFor="bakiTxn">Txn</label>
            <input
              className="w-64 h-10 border pl-2 border-gray-300"
              type="text"
              placeholder="Details"
              name="bakiTxn"
              id="bakiTxn"
              value={allData[0].bakiTxn}
              onChange={handleChange}
            />
            <input
              className="w-20 h-10 pl-1 border border-gray-300"
              type="number"
              name="bakiBalance"
              id="bakiBalance"
              placeholder="Tk."
              value={allData[0].bakiBalance}
              onChange={handleChange}
            />
            <div className="flex gap-2 justify-center items-center">
              {errors.bakiTxn && <p className="text-red-500">{errors.bakiTxn}</p>}
              {errors.bakiBalance && <p className="text-red-500">{errors.bakiBalance}</p>}
            </div>
          </div>
        )}

        <button className="mt-6 w-20 h-10 bg-gray-400 text-white rounded-lg" type="submit">
          Save
        </button>
      </form>

      <div>
        {shop.map((data) => (
          <div key={data.id}>
            {sell ? (
              <div className="flex gap-4 justify-center items-center mt-2">
                <h1>{data.txn}</h1>
                <h1>{data.mainBalance}</h1>
              </div>
            ) : (

              <div className="flex gap-4 justify-center items-center mt-2">
                <h1>{data.bakiTxn}</h1>
                <h1>{data.bakiBalance}</h1>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
