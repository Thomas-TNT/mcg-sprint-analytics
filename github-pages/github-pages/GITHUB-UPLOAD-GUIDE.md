# GitHub Pages Upload Guide
## Easy Sprint Dashboard Deployment

---

## 🎯 **Quick Setup (One-Time)**

### **Step 1: Create GitHub Repository**
1. Go to GitHub.com and create new repository
2. Name it something like `mcg-sprint-analytics`
3. Make it **Public** (required for free GitHub Pages)
4. Initialize with README

### **Step 2: Enable GitHub Pages**
1. Go to repository **Settings**
2. Scroll to **Pages** section
3. Set **Source** to "Deploy from a branch"
4. Select **main** branch
5. Select **/ (root)** folder
6. Click **Save**

### **Step 3: Upload Dashboard Files**
1. **Upload entire `github-pages` folder** to repository root
2. **Rename folder** from `github-pages` to repository root files
3. **Commit changes** with message "Initial sprint dashboard deployment"

---

## 🚀 **For Each New Sprint Analysis**

### **Local Analysis Process**
1. **Reference folder**: `@(6) Sprints/`
2. **Use trigger**: `ANALYZE SPRINT`
3. **Provide CSV** and sprint details
4. **Receive analysis** locally in ~8 minutes

### **GitHub Upload Process**

#### **Step 1: Copy New Sprint Data**
```
Local: (6) Sprints/CURRENT-SPRINT/sprint-[ID].json
→ Copy to: github-pages/data/sprint-[ID].json
```

#### **Step 2: Update Dashboard (If Needed)**
- Usually automatic - dashboard loads JSON dynamically
- Only update `index.html` if major changes needed

#### **Step 3: Upload to GitHub**
1. **Add new files** to repository
2. **Commit changes** with message: "Add Sprint [ID] analysis"
3. **Push to main branch**
4. **GitHub Pages deploys** automatically (2-3 minutes)

---

## 📁 **GitHub Repository Structure**

### **Recommended Structure:**
```
your-repository/
├── index.html              # Main dashboard (from github-pages/)
├── data/                   # Sprint data files
│   ├── sprint-25Q309-S1.json
│   ├── sprint-25Q309-S2.json
│   └── [future sprints]
├── README.md              # Repository documentation
└── .gitignore             # Ignore local files
```

### **Files to Upload:**
✅ **Always Upload:**
- `index.html` (main dashboard)
- `data/sprint-[ID].json` (new sprint data)
- `README.md` (documentation)

❌ **Don't Upload:**
- Local CSV files
- Temporary analysis files
- Development templates
- Personal configuration files

---

## 🔄 **Automated Workflow (Future Enhancement)**

### **GitHub Actions Setup (Optional)**
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Sprint Dashboard
on:
  push:
    branches: [ main ]
    paths: [ 'data/**' ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

This would automatically deploy dashboard updates when you push new sprint data.

---

## 🎯 **Benefits of GitHub Pages Deployment**

### **Professional Hosting**
- **Custom URL**: `https://[username].github.io/mcg-sprint-analytics/`
- **SSL Security**: HTTPS enabled by default
- **Fast Loading**: GitHub's global CDN
- **99.9% Uptime**: Reliable hosting infrastructure

### **Stakeholder Access**
- **Share single URL** with all stakeholders
- **Always current** with latest sprint data
- **Mobile responsive** for viewing anywhere
- **Professional presentation** for executive meetings

### **Version Control Benefits**
- **Sprint history** tracked in Git commits
- **Change tracking** for all dashboard updates
- **Rollback capability** if issues arise
- **Team collaboration** on sprint analysis

---

## 📋 **Upload Checklist**

### **Initial Setup Checklist:**
- [ ] GitHub repository created
- [ ] GitHub Pages enabled
- [ ] Repository set to public
- [ ] `index.html` uploaded as main file
- [ ] `data/` folder created
- [ ] Sprint 25Q309-S1 JSON uploaded
- [ ] Dashboard loads correctly at GitHub Pages URL

### **New Sprint Upload Checklist:**
- [ ] Local sprint analysis completed using "ANALYZE SPRINT"
- [ ] New JSON file copied to `github-pages/data/`
- [ ] JSON file validated (proper format)
- [ ] Files committed to repository
- [ ] Changes pushed to main branch
- [ ] GitHub Pages deployment completed (2-3 minutes)
- [ ] Dashboard loads new sprint correctly
- [ ] Stakeholders notified of update

---

## 🔧 **Troubleshooting**

### **Common Issues:**

#### **Dashboard Not Loading**
- Check GitHub Pages is enabled
- Verify `index.html` is in repository root
- Ensure repository is public
- Wait 2-3 minutes for deployment

#### **Sprint Data Not Showing**
- Verify JSON file in `data/` folder
- Check JSON format validity
- Ensure file named correctly: `sprint-[ID].json`
- Clear browser cache and refresh

#### **Charts Not Rendering**
- Check browser console for JavaScript errors
- Verify Chart.js CDN is accessible
- Ensure JSON data structure matches expected format
- Test in different browser

### **Support Resources:**
- **GitHub Pages Documentation**: https://pages.github.com/
- **Chart.js Documentation**: https://www.chartjs.org/
- **JSON Validator**: https://jsonlint.com/

---

## 🎯 **Next Steps**

### **Ready for Production:**
1. **Upload `github-pages` folder** to your GitHub repository
2. **Enable GitHub Pages** in repository settings
3. **Access live dashboard** at your GitHub Pages URL
4. **Share URL** with stakeholders for ongoing sprint reviews

### **For Future Sprints:**
1. **Use "ANALYZE SPRINT"** keyword for local analysis
2. **Copy generated JSON** to GitHub repository
3. **Push changes** to trigger automatic deployment
4. **Dashboard updates** automatically with new sprint data

---

*This setup provides professional, always-accessible sprint analytics with minimal maintenance overhead while preserving all the executive value summary formatting and comprehensive analytics you've established.*

**GitHub Pages URL**: `https://[your-username].github.io/[repository-name]/`  
**Update Process**: Local analysis → JSON copy → Git push → Auto-deploy  
**Deployment Time**: 2-3 minutes after push  
**Maintenance**: Minimal - just add new JSON files for each sprint
