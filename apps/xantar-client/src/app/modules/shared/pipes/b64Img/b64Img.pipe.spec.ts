import { TestBed } from '@angular/core/testing';
import { B64ImgPipe } from './b64Img.pipe';
import { mockImage } from './b64Img.pipe.mock';

describe('B64ImgPipe', () => {
  let b64ImgPipe: B64ImgPipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [B64ImgPipe]
    });
    b64ImgPipe = TestBed.inject(B64ImgPipe);
  });
  it('should create', () => {
    expect(b64ImgPipe).toBeTruthy();
  });

  it('should return null if input is falsy', () => {
    expect(b64ImgPipe.transform(null)).toBeNull();
    expect(b64ImgPipe.transform(false)).toBeNull();
    expect(b64ImgPipe.transform('')).toBeNull();
    expect(b64ImgPipe.transform(undefined)).toBeNull();
    expect(b64ImgPipe.transform(0)).toBeNull();
  });

  it('should return base64 image prefixed so it can be used in a src attribute', () => {
    expect(b64ImgPipe.transform(mockImage)).toEqual({
      changingThisBreaksApplicationSecurity: `data:image/jpeg;base64, ${mockImage}`
    });
  });
});
