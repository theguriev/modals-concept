const SFC_SCRIPT_RE = /<script\s*[^>]*>([\s\S]*?)<\/script\s*[^>]*>/i;

const extractScriptContent = (html: string) => {
  const match = html.match(SFC_SCRIPT_RE);

  if (match && match[1]) {
    return match[1].trim();
  }

  return null;
};

export default extractScriptContent;
