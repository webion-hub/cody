export const prepareData = (data) => {
  let websiteUrl = "";
  const website = data.website;
  if(website !== ""){
    if(website.startsWith('https'))
      websiteUrl = website;
    if(website.startsWith('http')){
      websiteUrl = website.replace('http', 'https');
    }
    else
      websiteUrl = `https://${website}`
  }


  return {
    name: data.name,
    location: data.location? data.location : "",
    website: websiteUrl,
    description: data.description,
  }
}