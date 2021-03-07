export const extractText = (strToParse, strStart, strFinish) =>{
  return strToParse.match(strStart + '(.*?)' + strFinish)[1]
}

export const extractAuthor = (author) =>{
  return extractText(author, '("', '")')
}