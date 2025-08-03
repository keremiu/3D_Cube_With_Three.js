# 3D Küp Yapılandırıcı

Three.js ile yapılmış 3D küp tasarım programı.

## Geliştirici

**Kerem İhsan Ulaşan**

## Özellikler

- **3D Küp Oluşturma**: Gerçek boyutlarla dinamik küp modülleri
- **Sürüklenebilir Güneş**: Işık kaynağını sürükleyerek gölgeleri kontrol edin
- **Akıllı Modül Sistemi**: Genişlik 60cm'yi aştığında otomatik yeni modül
- **Bağımsız Kontrol**: Her modülü ayrı ayrı ayarlayın
- **Sol Taraf Sabit**: Profesyonel yeniden boyutlandırma
- **Modern Arayüz**: Temiz ve kullanışlı tasarım

## Nasıl Çalıştırılır

### Hızlı Başlangıç
```bash
# 1. Gerekli paketleri yükle
npm install

# 2. Geliştirme sunucusunu başlat
npm run dev

# 3. Tarayıcıda aç
# Otomatik olarak http://localhost:3000 açılır
```

### Adım Adım

1. **Gereksinimler**
   - Node.js (v16 veya üzeri)
   - npm paket yöneticisi

2. **Kurulum**
   ```bash
   git clone <repository-url>
   cd lazzoni
   npm install
   ```

3. **Çalıştırma**
   ```bash
   npm run dev
   ```



## Nasıl Kullanılır

### Temel Kontroller
- **Fare ile kamera**: 
  - Sol tık + sürükle: Döndür
  - Kaydır: Yakınlaştır/uzaklaştır
  - Sağ tık + sürükle: Hareket ettir
- **Güneş kontrolü**: Sarı küpü sürükleyerek ışığı hareket ettirin
- **Slider'lar**: Genişlik, yükseklik, derinlik ayarlayın (20-120cm)

### Modül Yönetimi
- **Otomatik ekleme**: 60cm aştığında ikinci modül gelir
- **Modül seçimi**: Listeden modül adına tıklayın
- **Boyut ayarlama**: Her modülü ayrı ayrı boyutlandırın
- **Ekleme/Silme**: Butonlarla manuel modül yönetimi

### Önemli Özellikler
- **Sol taraf sabit**: İlk modülün sol tarafı hiç hareket etmez
- **Gerçek boyutlar**: Scaling değil, gerçek ölçüler kullanılır
- **Canlı ışık**: Güneşi hareket ettirince gölgeler değişir
- **Renk kodlama**: Her modülün farklı rengi var

## Teknik Bilgiler

- **Framework**: Three.js (3D grafik)
- **Build**: Vite (hızlı geliştirme)
- **Dil**: Modern JavaScript
- **Tarayıcı**: Chrome, Firefox, Safari, Edge

## Dosya Yapısı

```
lazzoni/
├── index.html          # Ana uygulama
├── src/
│   └── main.js         # Ana kod
├── package.json        # Paketler
├── vite.config.js      # Ayarlar
└── README.md           # Bu dosya
```
