import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

import { WebScrappingService } from "../services/WebScrappingService";
import html2canvas from "html2canvas";

export default function WebScrapperComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [scrappedData, setScrappedData] = useState("");
  const [hasIncludedHttp, setHasNotIncludedHttp] = useState(true);
  const [websiteAddress, setWebsiteAddress] = useState("");
  const [invalidWebSiteMessage, setInvalidWebSiteMessage] = useState(false);

  const scrapWebsite = () => {
   
    const hasHttpIncluded = checkIfAddressContainsHttp();
    setInvalidWebSiteMessage(false);
    if (hasHttpIncluded) {
      setIsLoading(true);
      setHasNotIncludedHttp(true);
      WebScrappingService.getWebScrappedData(websiteAddress).then((resp) => {
    
        const { data } = resp;
        if (data.isWebsiteValid) {
          setScrappedData(data);
          setIsLoading(false);
        } else {
          setInvalidWebSiteMessage(true);
          setIsLoading(false);
        }
      });
    } else {
      setHasNotIncludedHttp(false);
    }
  };

  const checkIfAddressContainsHttp = () => {
    return (
      websiteAddress.includes("http:") || websiteAddress.includes("https:")
    );
  };

  const onWebAddressInput = ({ value }) => {
    setWebsiteAddress(value);
  };

  const downloadReport = () => {
    const filename = "scrappedData.pdf";

    html2canvas(document.body).then((canvas) => {
      var pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 211, 298);
      pdf.save(filename);
    });
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-7">
          <input
            type="text"
            className="form-control"
            placeholder="Enter website to scrap"
            onChange={(e) => onWebAddressInput(e.target)}
          ></input>
        </div>
        <div className="col-5">
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => scrapWebsite()}
          >
            Scrap
          </button>
        </div>

       
        {invalidWebSiteMessage && (
          <div className=" col-12 text-danger">
            Can't connect to this website!
          </div>
        )}

        {!hasIncludedHttp && (
          <div className=" col-12 text-danger">
            Please add "http" or "https" in your website!
          </div>
        )}

        {isLoading && (
          <div className=" col-12 text-primary mt-2">
             <i
              class="fa fa-circle-o-notch fa-spin text-primary"
              style={{ fontSize: "120%" }}
            ></i>{" "}
            <i>Analyzing Website and generating report.....</i>
          </div>
        )}

        {scrappedData && (
          <>
            <div className="col-12 mt-4 ">
              <h4>Scanning Result</h4>
            </div>
            <div className="col-12 mt-2">
              <b>Website Name : </b>
              {websiteAddress}
            </div>
            <div className="col-12 mt-2">
              <b>Title : </b> {scrappedData.title}
            </div>
            <div className="col-12 mt-2">
              <b>Meta Description : </b> {scrappedData.metaDescription}
            </div>
            <div className="col-12 mt-2">
              <b>Meta Keywords : </b> {scrappedData.metaKeywords}
            </div>
            <div className="col-12 mt-2">
              <div>
                <b>Screen Capture: </b>
              </div>
              <img
                src={scrappedData.imageSrc}
                className="mt-2"
                style={{ width: "85%", height: "85%" }}
              ></img>
            </div>
            <div className="col-12 mt-3">
              <b>Hyper Links: </b>
            </div>
            {scrappedData.otherLinks.length &&
              scrappedData.otherLinks.map((link) => {
                return <div className="col-12">{link}</div>;
              })}

            <div className="col-12 mt-3">
              <b>Hyper Links: </b>
            </div>
            {scrappedData.socialLinks.length &&
              scrappedData.socialLinks.map((link) => {
                return <div className="col-12">{link}</div>;
              })}
               <div className="col-12 mt-4 text-center">
          <button
            className="btn btn-success btn-lg"
            onClick={() => downloadReport()}
          >
            Download Report
          </button>
        </div>
          </>
        )}
       
      </div>
    </div>
  );
}
