import { Injectable } from '@angular/core';
import * as Forge from 'node-forge';

@Injectable({
  providedIn: 'root'
})
export class RSAHelperService {

  publicKey: string = `-----BEGIN PUBLIC KEY-----
MIICITANBgkqhkiG9w0BAQEFAAOCAg4AMIICCQKCAgBZF48xwByqyFPOGrNC8Bih
o9CkgNFgUvKAoaMTdOPRMaQ5hXNvQJshCIHdRkl6Se0QdA103Cb5QkoRMWk6O5X2
JbN2gMh22h0Or+9AQbZNdo8xleRjik499NzsjOwAtgQmdte/hqOLHw+52QkdedIh
v7jsTmt/2YyHdpjQpM1DZZxWsEPu5LvP2ghotCWyHB5Sgwf1Xm9yAonggrq85gJh
8cfhrYP1/2OXAJ4rHpkmv2c4gF+6QpTlK6Ki3TfNl4wTRjzGQpCZi8+hFh79QBfq
8q6RMrquEtxiesFw0gLzdnqEPCebPqXX9RLl0L0U+lWHt/kO5+PwxBWx4w2UfQv9
sJzJDfSC2UtbcOMdJar674qfnb5wN4j8tujBgzT0wtoPr87N3q+oUyGm5sSsRTuT
v1VQEkWU/TbsjDCmK9H+rRAbVmQyxcoYjmWd+RmGJ/X7M191faVVNC+qQpDB6DXz
e4IOBR06ECOgvmiV+H6mvUi2vPYK420Re+JRyFY2ksqACoF/sopUU0KXq1+3BSsK
VnSFWfahE9AyQ5dBJ2iGaaAjtbcdkfjLTIiNaAyeIGthPbWPyOu04elykuqo58DZ
32Y7u8ptcpy86WtodGbjFXGLaWEQMMyKQKBnMoD+BrxNdQsSPyMGFbOd517TmLDw
vosHg4ZzBiyhaa/XdUZGRQIDAQAB
-----END PUBLIC KEY-----`
  constructor() { }
encryptWithPK(valueToEncrypt: string){
  const rsa= Forge.pki.publicKeyFromPem(this.publicKey);
  return window.btoa(rsa.encrypt(valueToEncrypt.toString()));
}
  
}
