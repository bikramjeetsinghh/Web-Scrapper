const express = require('express');
const router = express.Router();
const scrapeIt = require('scrape-it');
const captureWebsite = require('capture-website');
const { uuid } = require('uuidv4');

const scrappedHTMLDataModel = {
  title: {
    selector: 'title',
  },
  metaDescription: {
    selector: "meta[name='description']",
    attr: 'content',
  },
  metaKeywords: {
    selector: "meta[name='keywords']",
    attr: 'content',
  },
  hyperLinks: {
    listItem: 'a[href^="h"]',
    data: {
      url: {
        attr: 'href',
      },
    },
  },
};

const socialMediaWebsitesNames = [
  'facebook',
  'instagram',
  'whatsapp',
  'linkedin',
  'gmail',
  'google',
  'twitter',
  'youtube',
  'pinterest',
  'whatsapp',
];

router.get('/scrapWebsite', async (req, res) => {
  const {websiteAddress} = req.query;
  try {
    return getScrappedData(websiteAddress)
      .then((scrappedData) => {
        const { data } = scrappedData;
        const allLinks = data.hyperLinks.map((hyperLink) => hyperLink.url);
        const links = extractLinks(allLinks);
        const screenShotName = `${uuid()}.png`;
        getWebsiteCapture(websiteAddress, `screenshots/${screenShotName}`).then((resp) => {
          const { hyperLinks, ...otherProps } = data;
          res.json({
            ...otherProps,
            socialLinks: links.socialMediaLinks,
            otherLinks: links.otherLinks,
            imageSrc: `http://localhost:8004/${screenShotName}`,
            isWebsiteValid: true,
          });
        }).catch(err => {
          debugger;
        });
      })
      .catch((err) => {
        res.json({ isWebsiteValid: false });
      });
  } catch (err) {
    res.json({ isWebsiteValid: false });
  }
});

const getScrappedData = (websiteAddress) => {
  return scrapeIt(websiteAddress, scrappedHTMLDataModel);
};

const getWebsiteCapture = (websiteAddress, screenShotName) => {
  return captureWebsite.file(websiteAddress, screenShotName, {delay:2});
};

const extractLinks = (hyperLinks) => {
  var socialMediaLinks = hyperLinks.filter((link) =>
    socialMediaWebsitesNames.find((socialMediaLink) => link.includes(socialMediaLink))
  );
  var otherLinks = hyperLinks.filter(
    (hyperLink) => !socialMediaLinks.find((socialMediaLink) => socialMediaLink === hyperLink)
  );
  return { socialMediaLinks, otherLinks };
};

module.exports = router;
