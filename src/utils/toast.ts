import { toast } from '@zerodevx/svelte-toast';
import Toast from '../components/Toast.svelte';

interface IToast {
  title?: string;
  message?: string;
  severity?: 'information' | 'success' | 'caution' | 'critical' | 'attention';
  closable?: boolean;
}

export default function send(options: IToast) {
  console.log(options);
  toast.push({
    component: {
      src: Toast,
      props: options,
      sendIdTo: 'toastId',
    },
    duration: 6000,
    initial: options.closable ? 1 : 0,
    dismissable: false,
    pausable: true,
    reversed: true,
    intro: { x: -256 },
    theme: {
      '--toastPadding': '0',
      '--toastMsgPadding': '0',
      '--toastBackground': 'transparent',
      '--toastBarHeight': '0',
      '--toastMinHeight': '0',
      '--toastMargin': '0 0 0 0',
      '--toastBorderRadius': '4px',
      '--toastBoxShadow': '0',
    },
  });
}

export function err2str(e: Error | string): string {
  if (e instanceof Error) return e.message || e.stack;
  return e;
}

export function sendError(e: Error | string, closable = true) {
  send({ title: '错误', message: err2str(e), severity: 'critical', closable });
}
