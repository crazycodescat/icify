/* eslint-disable react/prop-types */
const DistributorHeading = ({ distributor }) => {
  // console.log(distributor);

  // const distributorsHeadinDetails = [
  //   {
  //     name: 'DigiKey',
  //     img: 'https://res.cloudinary.com/ddx7todbr/image/upload/v1713606629/Electronics%20Parts%20Listing%20Website/s0l9tr2tn1qdzdbupymp.avif',
  //     headingDesc: 'ECIA (NEDA) Member &#x2022; Authorized Distributor',
  //   },
  //   {
  //     name: 'Mouser Electronics',
  //     img: 'https://res.cloudinary.com/ddx7todbr/image/upload/v1713606671/Electronics%20Parts%20Listing%20Website/c4nldcp1kyvyyzy08f2j.webp',
  //     headingDesc: 'ECIA (NEDA) Member &#x2022; Authorized Distributor',
  //   },
  // ];

  const distributorHeadingDetails = {
    digiKeyName: 'DigiKey',
    authorities: 'ECIA (NEDA) Member • Authorized Distributor',
    digiKeyLogo:
      'https://res.cloudinary.com/ddx7todbr/image/upload/v1713606629/Electronics%20Parts%20Listing%20Website/s0l9tr2tn1qdzdbupymp.avif',
    mouserName: 'Mouser Electronics',
    mouserLogo:
      'https://res.cloudinary.com/ddx7todbr/image/upload/v1713606671/Electronics%20Parts%20Listing%20Website/c4nldcp1kyvyyzy08f2j.webp',
  };

  return (
    <>
      <div className="flex justify-between py-2 border-[1px] w-full">
        <div className="flex flex-col gap-2">
          <img
            src={
              distributor === distributorHeadingDetails.digiKeyName
                ? distributorHeadingDetails.digiKeyLogo
                : distributor === distributorHeadingDetails.mouserName
                ? distributorHeadingDetails.mouserLogo
                : null
            }
            alt={
              distributor === distributorHeadingDetails.digiKeyName
                ? distributorHeadingDetails.digiKeyName
                : distributor === distributorHeadingDetails.mouserName
                ? distributorHeadingDetails.mouserName
                : null
            }
            className="max-w-20"
          />
          <span className="text-lg text-black font-medium">
            {distributor === distributorHeadingDetails.digiKeyName
              ? distributorHeadingDetails.digiKeyName
              : distributor === distributorHeadingDetails.mouserName
              ? distributorHeadingDetails.mouserName
              : null}
          </span>
          <span className="text-xs text-gray-600 font-medium">
            {distributorHeadingDetails.authorities}
          </span>
        </div>
        <a href="#" className="text-xs text-blue-800">
          Top of Page &uarr;
        </a>
      </div>
      <hr className="mb-2 w-full border-black border-[1px]" />
    </>
  );
};

export default DistributorHeading;
