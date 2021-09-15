import { TestBed } from '@angular/core/testing';
import { B64Pipe } from './b64.pipe';
import { mockImage } from './b64.pipe.mock';

describe('B64Pipe', () => {
  let b64Pipe: B64Pipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [B64Pipe]
    });
    b64Pipe = TestBed.inject(B64Pipe);
  });
  it('should create', () => {
    expect(b64Pipe).toBeTruthy();
  });

  it('should return null if input is falsy', () => {
    expect(b64Pipe.transform(null)).toBeNull();
    expect(b64Pipe.transform(false)).toBeNull();
    expect(b64Pipe.transform('')).toBeNull();
    expect(b64Pipe.transform(undefined)).toBeNull();
    expect(b64Pipe.transform(0)).toBeNull();
  });

  it('should return base64 image prefixed so it can be used in a src attribute', () => {
    expect(b64Pipe.transform(mockImage)).toEqual({
      changingThisBreaksApplicationSecurity: `data:image/jpeg;base64, ${mockImage}`
    });
  });
});
