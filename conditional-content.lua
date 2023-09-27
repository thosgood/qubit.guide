-- for content specific to either only HTML or PDF output
-- from https://stackoverflow.com/a/76255913 (but modified line 13 here)
function Div(el)
  if el.attributes['specific_to'] then
    if FORMAT:match 'latex' then
      if el.attributes['specific_to'] == "html" then
        el.content = ""
        return el
      end
    elseif FORMAT:match 'html' then
      if el.attributes['specific_to'] == 'latex' then
        el.content = ""
        return ""
      end
    end
  end
end
