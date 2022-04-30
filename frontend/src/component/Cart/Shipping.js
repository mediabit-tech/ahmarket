import React, { Fragment, useState } from 'react';
import './Shipping.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction';
import MetaData from '../layout/MetaData';
import PinDropIcon from '@material-ui/icons/PinDrop';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PubliIcon from '@material-ui/icons/Public';
import PhoneIcon from '@material-ui/icons/Phone';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import { Country, State } from 'country-state-city';
import { useAlert } from 'react-alert';
import CheckoutSteps from '../Cart/CheckoutSteps';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pincode, setPincode] = useState(shippingInfo.pincode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if(phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error("Phone number should be 10 digits long.");
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pincode, phoneNo})
        );
        navigate("/order/confirm");
    };

    return (
        <Fragment>
            <MetaData title="Shipping Details" />

            <CheckoutSteps activeStep={0} />

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>

                    <form
                        className='shippingForm'
                        encType='multipart/form-data'
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <HomeIcon />
                            <input
                                type="text"
                                placeholder='Address'
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <LocationCityIcon />
                            <input
                                type="text"
                                placeholder='City'
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <PinDropIcon />
                            <input
                                type="number"
                                placeholder='Pincode'
                                required
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                            />
                        </div>

                        <div>
                            <PhoneIcon />
                            <input
                                type="number"
                                placeholder='Phone Number'
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size="10"
                            />
                        </div>

                        <div>
                            <PubliIcon />
                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country && Country.getAllCountries().map((item) => (
                                    <option value={item.isoCode} key={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {country && (
                            <div>
                                <TransferWithinAStationIcon />
                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State && State.getStatesOfCountry(country).map((item) => (
                                        <option value={item.isoCode} key={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Shipping