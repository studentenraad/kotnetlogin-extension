var Instelling = {

  getLetter : function(inst) {
    switch (inst) {
      case 'kuleuven': return 'a'; break;
      case 'lessius':  return 'b'; break;
      case 'khk':      return 'c'; break;
      case 'khlim':    return 'd'; break;
      case 'kahosl':   return 'e'; break;
      case 'wenk':     return 'f'; break;
      case 'khbo':     return 'g'; break;
      case 'katho':    return 'h'; break;
      case 'khm':      return 'i'; break;
      case 'groept':   return 'j'; break;
      case 'khleuven': return 'k'; break;
      case 'ehsal':    return 'l'; break;
      case 'sintlukas':return 'm'; break;
      default:         return '';  break;
    }
  },
  
  hasToledo : function(inst) {
    switch (inst) {
      case 'kuleuven':
      case 'lessius':
      case 'khk':
      case 'khlim':
      case 'kahosl':
      case 'wenk':
      case 'khbo':
      case 'katho':
      case 'khm':
      case 'groept':
      case 'khleuven':
      case 'ehsal':
      case 'sintlukas':
        return true;
        break;
      default:
        return false;
        break;
    }
  },

  toledoLoginUrl : function(inst) {
    switch (inst) {
      case 'kuleuven':
      case 'lessius':
      case 'khk':
      case 'khlim':
      case 'kahosl':
      case 'wenk':
      case 'khbo':
      case 'katho':
      case 'khm':
      case 'groept':
      case 'khleuven':
      case 'ehsal':
      case 'sintlukas':
        return 'https://cygnus.cc.kuleuven.be/Shibboleth.sso/WAYF/'+inst;
        break;
      default:
        return false;
        break;
    }
  },
  
  hasKotnet : function(inst) {
    switch (inst) {
      case 'kuleuven':
      case 'kuleuven-potd':
      case 'lessius':
      case 'khlim':
      case 'kubrussel':
      case 'wenk':
      case 'khbo':
      case 'groept':
      case 'khleuven':
      case 'ehsal':
      case 'sintlukas':
        return true;
        break;
      default:
        return false;
        break;
    }
  },
  
  getKotnetName : function(inst) {
    switch (inst) {
      case 'groept':     return 'groept-aid';   break;
      case 'ehsal':      return 'ehsal-aid';    break;
      case 'lessius':    return 'lessius-aid';  break;
      case 'wenk':       return 'wenk-aid';     break;
      default:           return inst;           break;
    }
  },
}
