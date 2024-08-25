import { ChangeEvent } from 'react';

interface Address {
  city: string;
  state: string;
  country: string;
}

interface Data {
  pickUp: boolean;
  paid: boolean;
  address: Address | null;
}

interface OrderFormProps {
  data: Data;
  newAddress: boolean;
  handleChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
}

const OrderForm = ({ data, newAddress, handleChange }: OrderFormProps) => {
  return (
    <form className="w-full">
      {/* Pickup checkbox */}
      <div className="flex items-center mb-3">
        <input
          className="mr-2 leading-tight"
          id="pickup"
          type="checkbox"
          name="pickUp"
          checked={data.pickUp}
          onChange={handleChange}
        />
        <label className="text-gray-700 text-sm font-bold" htmlFor="pickup">
          Pickup
        </label>
      </div>

      {/* New Address checkbox */}
      <div className="flex items-center mb-3">
        <input
          className="mr-2 leading-tight"
          id="newAddress"
          type="checkbox"
          name="newAddress"
          checked={newAddress}
          onChange={handleChange}
        />
        <label className="text-gray-700 text-sm font-bold" htmlFor="newAddress">
          New Address
        </label>
      </div>

      {/* Address form */}
      {newAddress && data.address && (
        <div className="mt-8">
          <p className="font-bold text-red-700">Warning</p>
          <p className="text-red-600">
            Enter a new address only if your location is different from your
            registered address. If your current location is the same as the one
            you entered while registering, do not enter a new address.
          </p>
          <div className="flex flex-col gap-4 mt-6">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="city"
              >
                City:
              </label>
              <select
                className="bg-transparent w-full py-2 text-gray-700 focus:outline-none focus:shadow-outline"
                id="city"
                name="city"
                value={data.address.city}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                <option value="Chaarali">Chaarali</option>
              </select>
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="state"
              >
                State:
              </label>
              <select
                className="py-2 bg-transparent w-full text-gray-700 focus:outline-none focus:shadow-outline"
                id="state"
                name="state"
                value={data.address.state}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                <option value="Koshi">Koshi</option>
              </select>
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="country"
              >
                Country:
              </label>
              <select
                className="bg-transparent w-full py-2 text-gray-700 focus:outline-none focus:shadow-outline"
                id="country"
                name="country"
                value={data.address.country}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                <option value="Nepal">Nepal</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default OrderForm;
